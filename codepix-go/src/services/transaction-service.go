package services

import (
	"codepix/src/model"
	"errors"
)

type TransactionService struct {
	TransactionRepository model.TransactionRepositoryInterface
	PixRepository         model.PixKeyRepositoryInterface
}

func (t *TransactionService) Register(accountId string, amount float64, pixKeyto string, pixKeyKindTo string, description string, id string) (*model.Transaction, error) {

	account, err := t.PixRepository.FindAccount(accountId)
	if err != nil {
		return nil, err
	}

	pixKey, err := t.PixRepository.FindKeyByKind(pixKeyto, pixKeyKindTo)
	if err != nil {
		return nil, err
	}

	transaction, err := model.NewTransaction(account, amount, pixKey, description, id)
	if err != nil {
		return nil, err
	}

	t.TransactionRepository.Save(transaction)
	if transaction.Base.ID != "" {
		return transaction, nil
	}

	return nil, errors.New("unable to process this transaction")

}
