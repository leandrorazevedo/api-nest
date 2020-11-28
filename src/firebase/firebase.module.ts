import { Module } from '@nestjs/common';
import { Init } from './init';

@Module({
  providers: [Init]
})
export class FirebaseModule {}
