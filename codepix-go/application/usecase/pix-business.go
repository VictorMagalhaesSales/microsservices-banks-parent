package usecase

import "codepix/domain/model"

type PixBusiness struct {
	PixKeyRepository model.PixKeyRepositoryInterface // Interface cuja implementação será PixKeyRepositoryDb
}

/*
* Busca a `Account` e cria uma pixKey do tipo `kind` com a chave `key`
 */
func (p *PixBusiness) RegisterKey(key string, kind string, accountId string) (*model.PixKey, error) {
	account, err := p.PixKeyRepository.FindAccount(accountId)
	if err != nil {
		return nil, err
	}
	pixKey, err := model.NewPixKey(kind, account, key)
	if err != nil {
		return nil, err
	}
	pix, err := p.PixKeyRepository.RegisterKey(pixKey)
	if pix.ID == "" {
		return nil, err
	}
	return pix, nil
}

func (p *PixBusiness) findKey(key string, kind string) (*model.PixKey, error) {
	pixKey, err := p.PixKeyRepository.FindKeyByKind(key, kind)
	if err != nil {
		return nil, err
	}
	return pixKey, err
}
