package repository

import (
	"codepix/domain/model"
	"fmt"

	"github.com/jinzhu/gorm"
)

/*
* Os métodos da struct são os da interface `TransactionRepositoryInterface`;
* No Go, não implementamos a interface via código, pois é ele quem faz essa inferência;
* Então, por baixo dos panos, o Go vai considerar a struct `TransactionRepositoryDb` como implementação da interface
 */
type TransactionRepositoryDb struct {
	Db *gorm.DB
}

func (r TransactionRepositoryDb) Register(transactional *model.Transaction) error {
	err := r.Db.Create(transactional).Error
	if err != nil {
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
