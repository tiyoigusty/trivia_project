import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';

interface Player {
  id: string;
  username: string;
  avatar: string;
  clientId: string;
}

interface Room {
  id: string;
  players: Player[];
}

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private rooms: Room[] = [];

  constructor(private readonly prisma: PrismaService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    console.log('room', this.rooms);
    // Mencari room yang mengandung client.id
    const playerRoom = this.rooms.find((room) => {
      return room.players.some((player) => player.clientId === client.id);
    });
    // Menghapus player dengan clientId yang sesuai dari playerRoom
    if (playerRoom) {
      playerRoom.players = playerRoom.players.filter(
        (player) => player.clientId !== client.id,
      );
      console.log('player', playerRoom);
      this.server.to(playerRoom.id).emit('updatePlayers', playerRoom.players);
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() userData: { id: string },
  ) {
    console.log('userData', userData);
    let room = this.rooms.find((x) => x.players.length < 5);

    if (!room) {
      room = { id: `room-${this.rooms.length + 1}`, players: [] };
      this.rooms.push(room);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userData.id },
      include: { user_avatar: { include: { Avatar: true } } },
    });

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    user.user_avatar.forEach((data) => {
      if (data.is_active == true) {
        const newPlayer = {
          id: user.id,
          username: user.username,
          avatar: data.Avatar.image,
          clientId: client.id,
        };

        if (!room.players.some((player) => player.id === newPlayer.id)) {
          room.players.push(newPlayer);
          client.join(room.id);
          console.log(`User ${user.id} joined room ${room.id}`);
        }
      }
    });

    console.log('room player', room.players);

    client.emit('test', {
      test: 'test',
    });

    if (room.players.length === 2) {
      this.server
        .to(room.id)
        .emit('startMatch', { room: room.id, players: room.players });
      this.rooms = this.rooms.filter((x) => x.id !== room.id);
    } else {
      console.log('Emitting updatePlayers event:', room.players); // Add this log
      this.server.to(room.id).emit('updatePlayers', room.players);
    }
  }
}
