package main

import (
	"codepix/src/config"
	"codepix/src/modules/grpc"
	"os"

	"github.com/jinzhu/gorm"
)

var database *gorm.DB

func main() {
	database := config.ConnectDB(os.Getenv("env"))
	grpc.StartGrpcServer(database, 50051)
}
