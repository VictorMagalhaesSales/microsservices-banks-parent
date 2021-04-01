import { Body, Controller, Get, Param, ParseUUIDPipe, Post, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from 'src/models/bank-account.model';
import { TransactionDto } from 'src/models/dto/transaction.dto';
import { Transaction, TransactionOperation} from 'src/models/transaction.model';
import { Repository } from 'typeorm';

@Controller('bank-accounts/:bankAccountId/transactions')
export class TransactionController {

  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepo: Repository<BankAccount>,
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>
  ) {}

  @Get()
  index(
    @Param(
      'bankAccountId',
      new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 422 }),
    )
    bankAccountId: string,
  ) {
    return this.transactionRepo.find({
      where: {
        bank_account_id: bankAccountId,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  @Post()
  async store(
    @Param(
      'bankAccountId',
      new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 422 }),
    )
    bankAccountId: string,
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    body: TransactionDto,
  ) {
    await this.bankAccountRepo.findOneOrFail(bankAccountId);

    let transaction = this.transactionRepo.create({
      ...body,
      amount: body.amount * -1,
      bank_account_id: bankAccountId,
      operation: TransactionOperation.debit,
    });
    return this.transactionRepo.save(transaction);
  }

}
