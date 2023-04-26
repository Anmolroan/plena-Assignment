export declare class RabbitMQService {
    private connection;
    private channel;
    connect(): Promise<void>;
    publish(exchange: string, routingKey: string, message: string): Promise<void>;
}
