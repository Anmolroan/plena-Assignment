import { Injectable } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';



@Injectable()
export class RabbitMQService {
  private connection: Connection;
  private channel: Channel;

  async connect() {
    this.connection = await connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
  }

  async publish(exchange: string, routingKey: string, message: string) {
    if (!this.connection) {
      await this.connect();
    }
    if (!this.channel) {
      this.channel = await this.connection.createChannel();
    }
    this.channel.assertExchange(exchange, 'topic', { durable: true });
    this.channel.publish(exchange, routingKey, Buffer.from(message));
  }
  // async publish(exchange: string, routingKey: string, message: string) {
  //   this.channel.assertExchange(exchange, 'topic', { durable: true });
  //   this.channel.publish(exchange, routingKey, Buffer.from(message));
  // }
}




