import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { BankAccountController } from './controllers/bank-account.controller';
import { PixKeyController } from './controllers/pix-key.controller';
import { BankAccount } from './models/bank-account.model';
import { PixKey } from './models/pix-key.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConsoleModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      // Entidades que poderão ser utilizadas pela aplicação
      entities: [BankAccount, PixKey]
    }),
    TypeOrmModule.forFeature([BankAccount, PixKey]),
  ],
  controllers: [BankAccountController, PixKeyController],
  providers: [],
})
export class AppModule {}
