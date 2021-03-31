import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from '@models/bank-account.model';
import { Repository } from 'typeorm';

@Controller('bank-account')
export class BankAccountController {

    constructor(
        @InjectRepository(BankAccount)
        private bankAccountRepo: Repository<BankAccount>
    ) {}

    @Get()
    private list() {
        return this.bankAccountRepo.find();
    }

}
