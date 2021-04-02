# api-bank-nestjs
Microservice feito em NestJS com o objetivo de controlar os **bancos** que utilizaremos durante o projeto. 
Foi utilizado o **TypeORM** como ORM e o **nestjs-console** junto com **commander** para fazer uma carga inicial de dados([console.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/console.ts) e [fixtures.command.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/utils/fixtures/fixtures.command.ts));

- **@nestjs/microservices**: habilita o projeto como client para consumir outros serviços. Basta adicionar `ClientsModule.register([clientGrpcConfig, clientConfig2])`ao seu módulo;
- **class-validator**: nos permite criar validações(string, tipo e etc) em propriedade dos nossos models;

## gRPC
- Bibliotecas utilizadas: **grpc** e **@grpc/proto-loader**.
- **Conexão** feita através do módulo **[ClientsModule](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/app.module.ts)**, passando as configurações do servidor gRPC feito em Golang;
- **[pixKey.proto](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/modules/grpc/pixkey.proto)**: arquivo com o **contrato de comunicação** gRPC idêntico ao da aplicação em Golang;
- Ao registrar um Pix, em **[pix-key.controller.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/controllers/pix-key.controller.ts)**, a api chama o serviço Golang via gRPC, verifica se já existe e cria a Pix. Somente após isso é criado a pix no DB da api-bank. 

## Running the app
```bash
# Install dependencies
npm install

# Run migrations
npm run typeorm migration:run

# Prepare database data
npm run console fixtures

# Run as development mode
$ npm run start
# Run as watch mode
$ npm run start:dev
# Run as production mode
$ npm run start:prod
```
