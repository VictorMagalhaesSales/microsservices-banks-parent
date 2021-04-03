# api-pix-go
Microservice feito em Golang com o objetivo de ser um **hub de transações** entre os **bancos** que simularemos durante o projeto. 
Possui uma organização de pastas pensadas para um melhor entendimento da arquitetura para revisão de conteúdo. As tecnologias terceiras utilizadas ficam localizadas na pasta **src/modules** e o servidor bem como os consumidores e produtores do kafka são iniciados em **[commands.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-pix-go/cmd/commands.go)**.

## gRPC
- **[pixKey.proto](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-pix-go/src/modules/grpc/pixkey.proto)**: arquivo com o **contrato de comunicação** gRPC; definide as **messages** e o **service** que formam as requisições;
- **[pix-grpc-service.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-pix-go/src/modules/grpc/pix-grpc-service.go)**: **implementa o service** do arquivo .proto realizando as operações de crud em conjunto com [PixService](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/api-pix-go/src/services/pix-service.go);
- **[server.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-pix-go/src/modules/grpc/server.go)**: possui a função responsável por **iniciar o servidor grpc** e **registrar os services grpc** implementados;

## Apache Kafka
- **[producer.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-pix-go/src/modules/kafka/producer.go)**: cria o produto e publica as mensagens no kafka;
- **[consumer.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-pix-go/src/modules/kafka/consumer.go)**: cria o consumidor e se inscreve em 2 tópicos da aplicação; quando há mensagem, faz procedimento de CRUD e publica o resultado em outro tópico;

## Run application
```sh
# Run docker-compose services
docker-compose up -d

# Run go application
go run main.go all

# Test gRPC Server with Evans
docker exec -it codepix-go_app_1 bash
evans -r repl
call RegisterPixKey...
call Find...
```