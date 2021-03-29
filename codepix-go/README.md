# codepix-go
Microservice feito em Golang com o objetivo de ser um **hub de transações** entre os **bancos** que simularemos durante o projeto.

## Topics:
- **GORM**: lib ORM para Golang.
- **gRPC**: protocolo de comunicação utilizado;

## gRPC
- **[server.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/codepix-go/application/grpc/server.go)**: possui a função responsável por iniciar o servidor grpc, que deve ser chamado ao iniciar a aplicação;
- **[pixKey.proto](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/codepix-go/application/grpc/protofiles/pixkey.proto)**: definide todas as **messages**(models) aceitas nas requisições e o **service** com o contrato das requisições;

## Folders organization
- **application**: regras de negócios da aplicação;
- **domain**: regras de negócio dos domínios/models;
    - **[model](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/codepix-go/domain/model)** folder: armazenam as structs de modelo cuja regra de negócio de auto validação(isValid(), govalidator), relacionamentos e instanciamento da struct( new*Bank*()) estão contidos.
- **infraestructure**: conectores de serviços externos como banco de dados e persistência;
    - **[db.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/codepix-go/infraestructure/db/db.go)**: arquivo de conexão com o DB através do GORM;
    - **[pix-repository.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/codepix-go/infraestructure/repository/pix-repository.go)** e **[transaction-repository.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/codepix-go/infraestructure/repository/transaction-repository.go)** são structs que recebem um banco de dados e realizam as operações de crud; 
- **cmd**: comandos para iniciar a aplicação e seus serviços(cli);

## Run application
```sh
cd codepix-go

# Iniciar serviços do docker compose
docker-compose up -d

# Iniciar a aplicação
go run cmd/codepix/main.go
```


protoc --go_out=application/grpc/pb --go_opt=paths=source_relative --go-grpc_out=application/grpc/pb --go-grpc_opt=paths=source_relative --proto_path=application/grpc/protofiles application/grpc/protofiles/*.proto