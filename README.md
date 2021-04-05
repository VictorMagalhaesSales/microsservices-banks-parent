# microsservices-banks-parent
![NextJS](https://img.shields.io/badge/-nextjs-black?style=flat-square&logo=next.js)
![NestJS](https://img.shields.io/badge/-nestjs-red?style=flat-square&logo=nestjs&color=ea2845)
![Golang](https://img.shields.io/badge/-Golang-blue?style=flat-square&logo=go&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-blue?style=flat-square&logo=Docker&logoColor=white)
![Kafka](https://img.shields.io/badge/-Kafka-gray?style=flat-square&logo=apache)
![gRPC](https://img.shields.io/badge/-gRPC-gray?style=flat-square&logo=gRPC&color=244c5a)

Microserviços feitos com Go, NextJS e NestJS. Comunicação com Apache Kafka e gRPC conteinerizado com Docker. Projeto feito seguindo a "Imersão Full Stack && Full Cycle" da Code Education. A organização do projeto e suas documentações foram feitas pensadas em futuras revisões de códigos, conteúdos e arquitetura.

# Microsservices

- UI Bank(NextJS) - [Documentation](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/ui-bank-nextjs/README.md)
- API Bank(NestJS) - [Documentation](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-bank-nestjs/README.md)
- API Pix(Golang) - [Documentation](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-pix-go/README.md)

# Comuncation
- O Frontend UIBank(NextJS) se comunica diretamente com a aplicação APiBank(NesJS) através do protocolo **Rest**;
- Os 2 serviços de backend, APIBank e APIPix, se comunicam através de **gRPC** e serviço de mensageria do **Apache Kafka**;
    
    #### Pix
    - Ao criar um Pix, a ApiBank solicita a ApiPix, via **gRPC**, para verificar se o Pix já existe; 
    - Caso não existe, a ApiBank persiste o Pix e solicita a ApiPix, via **gRPC**, para persisitir a Pix;
    
    #### Transação
    - Ao criar uma transação, a ApiBank publica uma mensagem no **kafka** com a transação criada.
    - A ApiPix consome essa mensagem do **kafa**, persiste no seu banco e publica outra mensagem confirmando a transação.
    - A ApiBank consome a mensagem de confirmação do **kafka** e atualiza o status da transação na sua base de dados.

## Running containres
```bash
# Running ALL containers
docker-compose up

# Running NextJS container
cd ui-bank-nextjs
docker-compose up

# Running NestJS container
cd api-bank-nestjs
docker-compose up

# Running Golang container
cd api-pix-go
docker-compose up
```
