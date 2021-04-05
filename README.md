# microsservices-banks-parent
![NextJS](https://img.shields.io/badge/-nextjs-black?style=flat-square&logo=next.js)
![NestJS](https://img.shields.io/badge/-nestjs-red?style=flat-square&logo=nestjs&color=ea2845)
![Golang](https://img.shields.io/badge/-Golang-blue?style=flat-square&logo=go&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-blue?style=flat-square&logo=Docker&logoColor=white)
![Kafka](https://img.shields.io/badge/-Kafka-gray?style=flat-square&logo=apache)
![gRPC](https://img.shields.io/badge/-gRPC-gray?style=flat-square&logo=gRPC&color=244c5a)

Microserviços feitos com Go, NextJS e NestJS. Comunicação com Apache Kafka e gRPC conteinerizado com Docker. Projeto feito seguindo a "Imersão Full Stack && Full Cycle" da Code Education.

# Microsservices

- UIBank(NextJS) - [Documentation](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/ui-bank-nextjs/README.md)

- ApiBank(NestJS) - [Documentation](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-bank-nestjs/README.md)

- ApiCodePix(Golang) - [Documentation](https://github.com/VictorMagalhaesSales/microsservices-banks-parent/tree/master/api-pix-go/README.md)


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
