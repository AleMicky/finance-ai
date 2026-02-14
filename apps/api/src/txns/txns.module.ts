import { Module } from '@nestjs/common';
import { TxnsService } from './txns.service';
import { TxnsController } from './txns.controller';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [TxnsController],
  providers: [TxnsService],
  exports: [TxnsService],
})
export class TxnsModule {}
