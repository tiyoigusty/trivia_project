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
export class RoomService {
  private rooms: Room[] = [];

  constructor(private readonly prisma: PrismaService) {}

  createRoom(): Room {
    const room: Room = { id: `room-${this.rooms.length + 1}`, players: [] };
    this.rooms.push(room);

    // Simpan room ke database
    this.prisma.match.create({ data: { id: room.id } });

    return room;
  }

  findRoomByPlayerId(clientId: string): Room | undefined {
    return this.rooms.find((room) =>
      room.players.some((player) => player.clientId === clientId),
    );
  }

  findAvailableRoom(): Room | undefined {
    return this.rooms.find((room) => room.players.length < 3);
  }

  addPlayerToRoom(room: Room, player: Player) {
    room.players.push(player);
  }

  removePlayerFromRoom(clientId: string) {
    const room = this.findRoomByPlayerId(clientId);
    if (room) {
      room.players = room.players.filter(
        (player) => player.clientId !== clientId,
      );

      if (room.players.length === 0) {
        this.rooms = this.rooms.filter((r) => r.id !== room.id);
        this.prisma.match.delete({ where: { id: room.id } });
      }
    }
  }

  getRooms(): Room[] {
    return this.rooms;
  }
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomService: RoomService,
    private readonly prisma: PrismaService,
  ) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    this.roomService.removePlayerFromRoom(client.id);

    const room = this.roomService.findRoomByPlayerId(client.id);
    if (room) {
      this.server.to(room.id).emit('updatePlayers', room.players);
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() userData: { id: string },
  ) {
    let room = this.roomService.findAvailableRoom();

    if (!room) {
      room = this.roomService.createRoom();
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userData.id },
      include: { user_avatar: { include: { Avatar: true } } },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const activeAvatar = user.user_avatar.find((avatar) => avatar.is_active);
    if (activeAvatar) {
      const newPlayer: Player = {
        id: user.id,
        username: user.username,
        avatar: activeAvatar.Avatar.image,
        clientId: client.id,
      };

      if (!room.players.some((player) => player.id === newPlayer.id)) {
        this.roomService.addPlayerToRoom(room, newPlayer);
        client.join(room.id);
        console.log(`User ${user.id} joined room ${room.id}`);
      }

      this.server.to(room.id).emit('updatePlayers', room.players);

      if (room.players.length === 1) {
        this.server
          .to(room.id)
          .emit('startMatch', { room: room.id, players: room.players });
      }
    }
  }
}

@WebSocketGateway({ namespace: 'match' })
@Injectable()
export class MatchService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomService: RoomService,
    private readonly prisma: PrismaService,
  ) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.roomService.removePlayerFromRoom(client.id);
  }

  @SubscribeMessage('matchStart')
  async handleMatchStart(
    @MessageBody() roomData: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const existingRoom = this.roomService.findRoomByPlayerId(client.id);

    if (existingRoom) {
      // Jika pemain sudah berada di room, bergabung kembali ke room tersebut
      client.join(existingRoom.id);
    } else {
      throw new NotFoundException('Room tidak ditemukan!');
    }

    // Ambil pertanyaan dari database
    const questions = await this.prisma.question.findMany();

    // Kirim pertanyaan ke klien
    this.server.to(existingRoom.id).emit('getQuestion', questions);
  }

  // Penanganan reconnect yang ditingkatkan
  handleReconnect(client: Socket) {
    const room = this.roomService.findRoomByPlayerId(client.id);
    if (room) {
      client.join(room.id);
      this.server
        .to(client.id)
        .emit('rejoinSuccess', { roomId: room.id, players: room.players });
    } else {
      this.server
        .to(client.id)
        .emit('error', 'Room tidak ditemukan atau match sudah dimulai');
    }
  }
}
