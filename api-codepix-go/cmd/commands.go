package cmd

import (
	"codepix/src/config"
	"codepix/src/modules/grpc"
	"codepix/src/modules/kafka"
	"os"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "codepix",
	Short: "Use codepix software to intermediate bank transaction with apache kafka and grpc",
}
var gRPCPortNumber int

// allCmd represents the all command
var allCmd = &cobra.Command{
	Use:   "all",
	Short: "Run gRPC and a Kafka Consumer",

	Run: func(cmd *cobra.Command, args []string) {
		database := config.ConnectDB(os.Getenv("env"))
		go grpc.StartGrpcServer(database, gRPCPortNumber)

		deliveryChan := make(chan ckafka.Event)
		producer := kafka.CreateKafkaProducer()
		go kafka.DeliveryReport(deliveryChan)
		kafkaProcessor := kafka.NewKafkaConsumer(database, producer, deliveryChan)
		kafkaProcessor.CreateKafkaConsumer()
	},
}

func Init() {
	rootCmd.AddCommand(allCmd)
	allCmd.Flags().IntVarP(&gRPCPortNumber, "grpc-port", "p", 50051, "gRPC Port")
	rootCmd.Execute()
}
