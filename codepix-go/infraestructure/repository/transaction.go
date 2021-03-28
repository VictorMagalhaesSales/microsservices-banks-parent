package repository

import (
	"codepix-go/domain/model"
	"fmt"

	"github.com/jinzhu/gorm"
)

type TransactionRepositoryDb struct {
	Db *gorm.DB
}

func (r TransactionRepositoryDb) Register(transactional *model.Transaction) error {
	err := r.Db.Create(transactional)
	if err == nil {
		return err
	}
	return nil
}
func (t *TransactionRepositoryDb) Save(transaction *model.Transaction) error {
	err := t.Db.Save(transaction).Error
	if err != nil {
		return err
	}
	return nil
}

func (t *TransactionRepositoryDb) Find(id string) (*model.Transaction, error) {
	var transaction model.Transaction
	t.Db.Preload("AccountFrom.Bank").First(&transaction, "id = ?", id)

	if transaction.ID == "" {
		return nil, fmt.Errorf("no transaction was found")
	}
	return &transaction, nil
}
