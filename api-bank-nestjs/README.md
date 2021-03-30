# api-bank-nestjs
Microservice feito em NestJS com o objetivo de controlar os **bancos** que utilizaremos durante o projeto. 
Foi utilizado o **TypeORM** como ORM, além do **nestjs-console** junto com **commander** para fazer a carga de dados inicial([console.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/console.ts) e [fixtures.command.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/utils/fixtures/fixtures.command.ts));

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
