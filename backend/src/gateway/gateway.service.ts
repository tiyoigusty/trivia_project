import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class GatewayService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private rooms: Map<string, string[]> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private matchTimers: Map<string, number> = new Map();

  private getAvailableRoomId(): string | null {
    for (const [roomId, clients] of this.rooms.entries()) {
      if (clients.length < 5) {
        return roomId;
      }
    }
    return null;
  }

  private leaveAllRooms(client: Socket): void {
    for (const [roomId, clients] of this.rooms.entries()) {
      const index = clients.indexOf(client.id);
      if (index !== -1) {
        clients.splice(index, 1);
        client.leave(roomId);
        this.server.to(roomId).emit('userLeft', client.id);
        if (clients.length === 0) {
          this.rooms.delete(roomId);
          if (this.intervals.has(roomId)) {
            clearInterval(this.intervals.get(roomId));
            this.intervals.delete(roomId);
            this.matchTimers.delete(roomId);
          }
        }
        break;
      }
    }
  }

  handleConnection(client: Socket) {
    console.log('client connect', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('client disconnect', client.id);
    this.leaveAllRooms(client);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket): void {
    console.log('Client requested to join room:', client.id);

    let roomId = this.getAvailableRoomId();

    if (!roomId) {
      roomId = client.id;
      this.rooms.set(roomId, []);
      this.matchTimers.set(roomId, Date.now()); // set initial start time for the room
    }

    client.join(roomId);
    this.rooms.get(roomId).push(client.id);

    this.server.to(roomId).emit('matchFound', { roomId, userId: client.id });

    if (this.rooms.get(roomId).length === 5) {
      this.server.to(roomId).emit('roomFull', roomId);
      if (this.intervals.has(roomId)) {
        clearInterval(this.intervals.get(roomId));
        this.intervals.delete(roomId);
        this.matchTimers.delete(roomId);
      }
    } else if (!this.intervals.has(roomId)) {
      this.startMatchInterval(roomId);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket): void {
    this.leaveAllRooms(client);
    this.server
      .to('leaveRoom')
      .emit('message', `User ${client.id} has left the room`);
  }

  private startMatchInterval(roomId: string): void {
    const interval = setInterval(() => {
      const startTime = this.matchTimers.get(roomId) || Date.now();
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

      this.server.to(roomId).emit('timerUpdate', elapsedTime);
    }, 1000);

    this.intervals.set(roomId, interval);
  }
}
