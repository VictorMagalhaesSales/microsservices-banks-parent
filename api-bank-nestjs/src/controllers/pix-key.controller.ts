import { Body, Controller, Get, Param, ParseUUIDPipe, Post, ValidationPipe } from '@nestjs/common';
import { PixKey } from '../models/pix-key.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PixKeyDto } from 'src/models/dto/pix-key.dto';
import { BankAccount } from 'src/models/bank-account.model';

@Controller('bank-accounts/:bankAccountId/pix-keys')
export class PixKeyController {

    constructor(
      @InjectRepository(PixKey)
      private pixKeyRepo: Repository<PixKey>,
      @InjectRepository(BankAccount)
      private bankAccountRepo: Repository<BankAccount>
    ) {}

    @Get()
    index(
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
    store(
      @Param('bankAccountId', new ParseUUIDPipe({ version: '4' }))
      bankAccountId: string,
      @Body(new ValidationPipe({errorHttpStatusCode: 422}))
      body: PixKeyDto
    ) {
      this.bankAccountRepo.findOneOrFail(bankAccountId);

      const pixKey = this.pixKeyRepo.create({
        bank_account_id: bankAccountId,
        ...body,
      });
      return this.pixKeyRepo.save(pixKey);
    }
}
