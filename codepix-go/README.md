# codepix-go
Microservice feito em Golang com o objetivo de ser um **hub de transações** entre os **bancos** que simularemos durante o projeto. 
Possui uma organização de pastas pensadas para um melhor entendimento da arquitetura para revisão de conteúdo. As tecnologias terceiras utilizadas ficam localizadas na pasta **src/modules**.

## gRPC
- **[pixKey.proto](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/codepix-go/src/modules/grpc/pixkey.proto)**: arquivo com o **contrato de comunicação** gRPC; definide as **messages** e o **service** que formam as requisições;
- **[pix-grpc-service.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/codepix-go/src/modules/grpc/pix-grpc-service.go)**: **implementa o service** do arquivo .proto realizando as operações de crud em conjunto com [PixService](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/blob/master/codepix-go/src/services/pix-service.go);
- **[server.go](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/codepix-go/src/modules/grpc/server.go)**: possui a função responsável por **iniciar o servidor grpc** e **registrar os services grpc** implementados;

## Apache Kafka

## Run application
```sh
# Run docker-compose services
docker-compose up -d

# Run go application
go run main.go
```