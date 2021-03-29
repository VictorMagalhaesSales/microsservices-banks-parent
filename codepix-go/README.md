# codepix-go
Microservice feito em Golang com o objetivo de ser um **hub de transações** entre os **bancos** que simularemos durante o projeto.

## Topics:
- **GORM**: lib ORM para Golang.
- **gRPC**: protocolo de comunicação utilizado;

## gRPC

- **[pixKey.proto](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/codepix-go/src/modules/grpc/pixkey.proto)**: arquivo com o **contrato de comunicação** gRPC; definide todas as **messages**(models) aceitas e o **service** com os métodos das requisições;

- **[PixGrpcService](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/codepix-go/src/modules/grpc/pix-grpc-service.go)**: **implementa o service** do arquivo .proto realizando as operações de crud em conjunto com **PixService**;

- **[server.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/codepix-go/src/modules/grpc/server.go)**: possui a função responsável por **iniciar o servidor grpc** e registrar o **PixGrpcService**;

## Run application
```sh
cd codepix-go

# Iniciar serviços do docker compose
docker-compose up -d

# Iniciar a aplicação
go run cmd/codepix/main.go
```