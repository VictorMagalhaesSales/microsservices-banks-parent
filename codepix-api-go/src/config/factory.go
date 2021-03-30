package config

import (
	"codepix/src/repository"
	"codepix/src/services"

	"github.com/jinzhu/gorm"
)

func TransactionServiceFactory(database *gorm.DB) services.TransactionService {
	pixRepository := repository.PixKeyRepositoryDb{Db: database}
	transactionRepository := repository.TransactionRepositoryDb{Db: database}

	transactionService := services.TransactionService{
		TransactionRepository: &transactionRepository,
		PixRepository:         pixRepository,
	}

	return transactionService
}
