package kafka

import (
	"codepix/src/config"
	"codepix/src/model"
	"codepix/src/services"
	"fmt"
	"os"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"

	"gorm.io/gorm"
)

type KafkaConsumer struct {
	Database     *gorm.DB
	Producer     *ckafka.Producer
	DeliveryChan chan ckafka.Event
}

func NewKafkaConsumer(database *gorm.DB, producer *ckafka.Producer, deliveryChan chan ckafka.Event) *KafkaConsumer {
	return &KafkaConsumer{
		Database:     database,
		Producer:     producer,
		DeliveryChan: deliveryChan,
	}
}

func (k *KafkaConsumer) CreateConsumer() {
	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": os.Getenv("kafkaBootstrapServers"),
		"group.id":          os.Getenv("kafkaConsumerGroupId"),
		"auto.offset.reset": "earliest",
	}
	c, err := ckafka.NewConsumer(configMap)
	if err != nil {
		panic(err)
	}

	topics := []string{os.Getenv("kafkaTransactionTopic"), os.Getenv("kafkaTransactionConfirmationTopic")}
	c.SubscribeTopics(topics, nil)
	fmt.Println("kafka consumer has been started")
	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			fmt.Println(string(msg.Value))
			k.processMessage(msg)
		}
	}
}

func (k *KafkaConsumer) processMessage(msg *ckafka.Message) {
	transactionsTopic := "transactions"
	transactionConfirmationTopic := "transaction_confirmation"

	switch topic := *msg.TopicPartition.Topic; topic {
	case transactionsTopic:
		k.processTransaction(msg)
	case transactionConfirmationTopic:
		k.processTransactionConfirmation(msg)
	default:
		fmt.Println("not a valid topic", string(msg.Value))
	}
}

func (k *KafkaConsumer) processTransaction(msg *ckafka.Message) error {
	transaction := model.NewTransactionDTO()
	err := transaction.ParseJson(msg.Value)
	if err != nil {
		return err
	}

	transactionService := config.TransactionServiceFactory(k.Database)

	createdTransaction, err := transactionService.Register(
		transaction.AccountID,
		transaction.Amount,
		transaction.PixKeyTo,
		transaction.PixKeyKindTo,
		transaction.Description,
		transaction.ID,
	)
	if err != nil {
		fmt.Println("error registering transaction", err)
		return err
	}

	topic := "bank" + createdTransaction.PixKeyTo.Account.Bank.Code
	transaction.ID = createdTransaction.ID
	transaction.Status = model.TransactionPending
	transactionJson, err := transaction.ToJson()

	if err != nil {
		return err
	}

	err = Publish(string(transactionJson), topic, k.Producer, k.DeliveryChan)
	if err != nil {
		return err
	}
	return nil
}

func (k *KafkaConsumer) processTransactionConfirmation(msg *ckafka.Message) error {
	transaction := model.NewTransactionDTO()
	err := transaction.ParseJson(msg.Value)
	if err != nil {
		return err
	}

	transactionService := config.TransactionServiceFactory(k.Database)

	if transaction.Status == model.TransactionConfirmed {
		err = k.confirmTransaction(transaction, transactionService)
		if err != nil {
			return err
		}
	} else if transaction.Status == model.TransactionCompleted {
		_, err := transactionService.Complete(transaction.ID)
		if err != nil {
			return err
		}
		return nil
	}
	return nil
}

func (k *KafkaConsumer) confirmTransaction(transaction model.TransactionDTO, transactionService services.TransactionService) error {
	confirmedTransaction, err := transactionService.Confirm(transaction.ID)
	if err != nil {
		return err
	}

	topic := "bank" + confirmedTransaction.AccountFrom.Bank.Code
	transactionJson, err := transaction.ToJson()
	if err != nil {
		return err
	}

	err = Publish(string(transactionJson), topic, k.Producer, k.DeliveryChan)
	if err != nil {
		return err
	}
	return nil
}
