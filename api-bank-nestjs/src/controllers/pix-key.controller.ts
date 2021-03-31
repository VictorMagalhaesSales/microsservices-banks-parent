import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { PixKey } from '@models/pix-key.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('bank-accounts/:bankAccountId/pix-keys')
export class PixKeyController {

    constructor(
        @InjectRepository(PixKey)
        private pixKeyRepo: Repository<PixKey>
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
}
