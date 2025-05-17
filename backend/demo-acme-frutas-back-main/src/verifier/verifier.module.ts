import { Module } from '@nestjs/common';
import { VerifierController } from './verifier.controller';
import { VerifierService } from './verifier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verify } from './entities/verify.entity';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Verify]),
    SocketModule,
  ],
  controllers: [VerifierController],
  providers: [VerifierService]
})
export class VerifierModule {}
