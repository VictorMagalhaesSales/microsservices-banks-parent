import { Body, Controller, Get, HttpCode, Inject, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe, Post, Query, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { PixKey } from '../models/pix-key.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PixKeyDto } from 'src/models/dto/pix-key.dto';
import { BankAccount } from 'src/models/bank-account.model';
import { ClientGrpc } from '@nestjs/microservices';
import { PixService } from 'src/modules/grpc/pix-service.grpc';

@Controller('bank-accounts/:bankAccountId/pix-keys')
export class PixKeyController {

    constructor(
      @InjectRepository(PixKey)
      private pixKeyRepo: Repository<PixKey>,
      @InjectRepository(BankAccount)
      private bankAccountRepo: Repository<BankAccount>,
      @Inject('CODEPIX_PACKAGE')
      private clientGrpc: ClientGrpc
    ) {}

    @Get()
    private index(
      @Param('bankAccountId', new ParseUUIDPipe({ version: '4' }))
      bankAccountId: string,
    ) {
      return this.pixKeyRepo.find({
        where: {
          bank_account_id: bankAccountId,
        },
        order: {
          created_at: 'DESC',
        },
      });
    }

    @Post()
    private async store(
      @Param('bankAccountId', new ParseUUIDPipe({ version: '4' }))
      bankAccountId: string,
      @Body(new ValidationPipe({errorHttpStatusCode: 422}))
      body: PixKeyDto
    ) {
      await this.bankAccountRepo.findOneOrFail(bankAccountId);
      const pixService: PixService = this.clientGrpc.getService('PixService');
      const notFound = await this.checkPixKeyNotFound(body);
      if (!notFound) {
        throw new UnprocessableEntityException('PixKey already exists');
      }
      console.log("50")
      const createdPixKey = await pixService
      .registerPixKey({
        ...body,
        accountId: bankAccountId,
      })
      .toPromise();

      if (createdPixKey.error) {
        throw new InternalServerErrorException(createdPixKey.error);
      }

      const pixKey = this.pixKeyRepo.create({
        id: createdPixKey.id,
        bank_account_id: bankAccountId,
        ...body,
      });
      return this.pixKeyRepo.save(pixKey);
    }

    async checkPixKeyNotFound(params: { key: string; kind: string }) {
      const pixService: PixService = this.clientGrpc.getService('PixService');
      try {
        await pixService.find(params).toPromise();
        return false;
      } catch (e) {
        if (e.details === 'no key was found') {
          return true;
        }
        console.log(e);
  
        throw new InternalServerErrorException('Server not available');
      }
    } 
    
    @Get('exists')
    @HttpCode(204)
    async exists(
      @Query(new ValidationPipe({ errorHttpStatusCode: 422 }))
      params: PixKeyDto,
    ) {
      const pixService: PixService = this.clientGrpc.getService('PixService');
      try {
        await pixService.find(params).toPromise();
      } catch (e) {
        if (e.details === 'no key was found') {
          throw new NotFoundException(e.details);
        }
        console.log(e);
  
        throw new InternalServerErrorException('Server not available');
      }
    }
}
