package services

import (
	"codepix/src/model"
	"errors"
	"fmt"
	"log"
)

type TransactionService struct {
	TransactionRepository model.TransactionRepositoryInterface
	PixRepository         model.PixKeyRepositoryInterface
}

func (t *TransactionService) Register(accountId string, amount float64, pixKeyto string, pixKeyKindTo string, description string, id string) (*model.Transaction, error) {

	account, err := t.PixRepository.FindAccount(accountId)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	pixKey, err := t.PixRepository.FindKeyByKind(pixKeyto, pixKeyKindTo)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	transaction, err := model.NewTransaction(account, amount, pixKey, description, id)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	t.TransactionRepository.Save(transaction)
	if transaction.Base.ID != "" {
		return transaction, nil
	}

	return nil, errors.New("unable to process this transaction")

}
func (t *TransactionService) Confirm(transactionId string) (*model.Transaction, error) {
	transaction, err := t.TransactionRepository.Find(transactionId)
	if err != nil {
		log.Println("Transaction not found", transactionId)
		return nil, err
	}

	transaction.Status = model.TransactionConfirmed
	err = t.TransactionRepository.Save(transaction)
	if err != nil {
		return nil, err
	}

	return transaction, nil
}

func (t *TransactionService) Complete(transactionId string) (*model.Transaction, error) {
	transaction, err := t.TransactionRepository.Find(transactionId)
	if err != nil {
		log.Println("Transaction not found", transactionId)
		return nil, err
	}

	transaction.Status = model.TransactionCompleted
	err = t.TransactionRepository.Save(transaction)
	if err != nil {
		return nil, err
	}

	return transaction, nil
}

func (t *TransactionService) Error(transactionId string, reason string) (*model.Transaction, error) {
	transaction, err := t.TransactionRepository.Find(transactionId)
	if err != nil {
		return nil, err
	}

	transaction.Status = model.TransactionError
	transaction.CancelDescription = reason

	err = t.TransactionRepository.Save(transaction)
	if err != nil {
		return nil, err
	}

	return transaction, nil

}
