# codepix-go
Microservice feito em Golang com o objetivo de ser um **hub de transações** entre os **bancos** que simularemos durante o projeto.

## Topics:
- **GORM**: Lib ORM do para Golang.

## Organization
- **application**: regras de negócios da aplicação;
- **domain**: regras de negócio dos domínios/models;
- **infraestructure**: conectores à serviços externos como banco de dados e persistência;
- **cmd**: comandos para iniciar a aplicação e seus serviços(cli);

## Run application
```sh
cd codepix-go

# Iniciar serviços do docker compose
docker-compose up -d

# Iniciar a aplicação
go run cmd/codepix/main.go
```
