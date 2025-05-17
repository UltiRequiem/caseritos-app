import { WebSocketGateway, OnGatewayConnection, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './services/socket.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Socket;
  private readonly logger = new Logger('ChatGateway');

  async onModuleInit(): Promise<void> {
    this.logger.log('ChatGateway initialized');
    this.socketService.deleteAll();
  }

  constructor(private readonly socketService: SocketService) {}

  async handleDisconnect(socket: Socket) {
    this.socketService.delete(socket.id);
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
    this.logger.log(
      `Client connected: ${socket.id}`,
    );
  }

  // Implement other Socket.IO event handlers and message handlers
}