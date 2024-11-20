import { Consumer, Kafka, Producer } from 'kafkajs'


class KafkaWrapper {
    private _kafka: Kafka
    private _producer?: Producer;
    private _consumer?: Consumer;
    constructor() {
        this._kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID || 'auth-service',
            brokers: [process.env.KAFKA_BROKERS || 'localhost:9092']
        })
    }

    async connect(): Promise<void> {
        this._producer = this._kafka.producer({ allowAutoTopicCreation: true });
        await this._producer.connect();
        console.log('connected to kafka');
    }

    get producer() {
        if (!this._producer) throw new Error('not producer initialized');
        return this._producer
    };

    async createConsumer(groupId: string) {
        this._consumer = this._kafka.consumer({ groupId });
        await this._consumer.connect();
        console.log('consumer connected');
        return this.consumer
    }

    get consumer() {
        if (!this._consumer) throw new Error('consumer not initialized');
        return this._consumer;
    }

    async disconnectFromKafka() {
        try {
            await this._producer?.disconnect();
            console.log('kafka disconnected')
        } catch (error) {
            console.log('somehting wrong when disconcet kafka')
        }
    }
}

const kafkaWrapper = new KafkaWrapper();

export default kafkaWrapper