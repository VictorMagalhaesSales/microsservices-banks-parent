package model

import (
	uuid "github.com/satori/go.uuid"
	"time"
)

type Base{
	ID string `json: "id"`
	CreatedAt time.Time `json: "CreatedAt"`
	UpdatedAt time.Time `json: "UpdatedAt"`
}