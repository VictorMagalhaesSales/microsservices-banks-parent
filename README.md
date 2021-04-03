# microsservices-banks-parent
![NextJS](https://img.shields.io/badge/-nextjs-black?style=flat-square&logo=next.js)
![NestJS](https://img.shields.io/badge/-nestjs-red?style=flat-square&logo=nestjs&color=ea2845)
![Golang](https://img.shields.io/badge/-Golang-blue?style=flat-square&logo=go&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-blue?style=flat-square&logo=Docker&logoColor=white)
![Kafka](https://img.shields.io/badge/-Kafka-gray?style=flat-square&logo=apache)
![gRPC](https://img.shields.io/badge/-gRPC-gray?style=flat-square&logo=gRPC&color=244c5a)

Microserviços feitos com Go, NextJS e NestJS. Comunicação com Apache Kafka e gRPC conteinerizado com Docker.

# Microsservices
- ApiCodePix(Golang) - [Documentation](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-pix-go/README.md)

- ApiBank(NestJS) - [Documentation](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-bank-nestjs/README.md)


## Running containres
```bash
# Running all containers
docker-compose up

# Running nestjs container
cd api-bank-nestjs
docker-compose up

# Running golang container
cd api-pix-go
docker-compose up
```
