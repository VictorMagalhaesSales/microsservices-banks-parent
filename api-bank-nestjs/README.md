# api-bank-nestjs
Microservice feito em NestJS com o objetivo de controlar os **bancos** que utilizaremos durante o projeto. 
Foi utilizado o **TypeORM** como ORM e o **nestjs-console** junto com **commander** para fazer uma carga inicial de dados([console.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/console.ts) e [fixtures.command.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/utils/fixtures/fixtures.command.ts));

- **@nestjs/microservices**: habilita o projeto como client para consumir outros serviços. Basta adicionar `ClientsModule.register([clientGrpcConfig, clientConfig2])`ao seu módulo;
- **class-validator**: nos permite criar validações(string, tipo e etc) em propriedade dos nossos models;
- **grpc** e **@grpc/proto-loader**: conexão feita através d módulo **ClientsModule**, em **[app.module.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/app.module.ts)**;

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
