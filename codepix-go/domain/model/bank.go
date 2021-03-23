package model

import (
	uuid "github.com/satori/go.uuid"
	"time"
)

type Bank struct {
	Base
	Code 	string `json: "Code"`
	Name 	string `json: "Name"`
}

/*
* Anexando a fução à struct Bank
*/
func (bank *Bank) isValid() error {
	return nil
}

/* 
* retornará um Bank ou error
*/
func NewBank(code string, name string) (*Bank, error) {
	bank := Bank{
		Code: code,
		Name: name
	}

	bank.ID = uuid.NewV4().String()
	bank.CreatedAt = time.Now()
	err := bank.isValid()
	if err != nil {
		return nil, err
	}

	return &bank, nil
}