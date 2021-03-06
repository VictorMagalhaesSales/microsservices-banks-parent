package services

import (
	"codepix/src/model"
	"fmt"
)

type PixService struct {
	PixKeyRepository model.PixKeyRepositoryInterface // Interface cuja implementação será PixKeyRepositoryDb
}

/*
* Busca a `Account` e cria uma pixKey do tipo `kind` com a chave `key`
 */
func (p *PixService) RegisterKey(key string, kind string, accountId string) (*model.PixKey, error) {
	account, err := p.PixKeyRepository.FindAccount(accountId)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	pixKey, err := model.NewPixKey(kind, account, key)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	pix, err := p.PixKeyRepository.RegisterKey(pixKey)
	if pix.ID == "" {
		fmt.Println(err)
		return nil, err
	}
	return pix, nil
}

func (p *PixService) FindKey(key string, kind string) (*model.PixKey, error) {
	pixKey, err := p.PixKeyRepository.FindKeyByKind(key, kind)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return pixKey, err
}
