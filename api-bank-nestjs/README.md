# api-bank-nestjs
Microservice feito em NestJS com o objetivo de controlar os **bancos** que utilizaremos durante o projeto. 
Foi utilizado o **TypeORM** como ORM e o **nestjs-console** junto com **commander** para fazer uma carga inicial de dados([console.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/console.ts) e [fixtures.command.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/utils/fixtures/fixtures.command.ts)).
## Bibliotecas
- **@nestjs/microservices**: habilita o projeto como client para consumir outros serviços. Basta adicionar `ClientsModule.register([clientGrpcConfig, clientConfig2])`ao seu módulo.
- **class-validator**: nos permite criar validações(string, tipo e etc) em propriedade dos nossos models.

## Apache Kafka
- **Conexão** feita através do módulo **[ClientsModule](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/app.module.ts)**(producer) e **[main.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/main.ts)**(consumer), passando as configurações de **consumers**, **producers**, clients e etc...
- Ao criar uma transação, em **[transaction.controller.ts](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/controllers/transaction.controller.ts)**, um producer envia uma mensagem para o **topic transactions** com a transação criada.
- No microservice de Pix, a mensagem com a transação criada é consumida e persistida. Depois, é feita uma nova publicação de mensagem confirmando a transação que será ouvida por esta aplicação, no método decorado com **@MessagePattern(`topic-name`)**, para então modificar o status da transação para confirmado.
- Para publicar uma mensagem, basta: **this.kafkaProducer.send({topic: 'topic', messages: [{key: 'topic', value: JSON.stringify(data)}]})**.

## gRPC
- Bibliotecas utilizadas: **grpc** para comunicação e **@grpc/proto-loader** para compilação dos arquivos *.proto.
- **Conexão** feita através do módulo **[ClientsModule](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/app.module.ts)**, passando as configurações do servidor gRPC feito em Golang.
- **[pixKey.proto](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-bank-nestjs/src/modules/grpc/pixkey.proto)**: arquivo com o **contrato de comunicação** gRPC idêntico ao da aplicação em Golang.
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
