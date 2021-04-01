import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { BankAccountController } from './controllers/bank-account.controller';
import { PixKeyController } from './controllers/pix-key.controller';
import { BankAccount } from './models/bank-account.model';
import { PixKey } from './models/pix-key.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FixturesCommand } from './utils/fixtures/fixtures.command';
import { join } from 'path';
import { Transaction } from './models/transaction.model';
import { TransactionController } from './controllers/transaction.controller';

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
      entities: [BankAccount, PixKey, Transaction]
    }),
    // Entidades que serão usadas por ESSE módulo especificamente
    TypeOrmModule.forFeature([BankAccount, PixKey, Transaction]),
    ClientsModule.register([{
      name: 'CODEPIX_PACKAGE',
      transport: Transport.GRPC,
      options: {
        url: process.env.GRPC_URL,
        package: 'codepix',
        protoPath: [join(__dirname, 'modules/grpc/pixkey.proto')]
      }
    }])
  ],
  controllers: [BankAccountController, PixKeyController, TransactionController],
  providers: [FixturesCommand],
})
export class AppModule {}
