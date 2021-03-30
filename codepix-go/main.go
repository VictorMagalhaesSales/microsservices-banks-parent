package main

import (
	"codepix/cmd"

	"github.com/jinzhu/gorm"
)

var database *gorm.DB

func main() {
	cmd.Init()
}
