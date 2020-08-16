const rabbit = require('amqplib');

class Rabbit {
  static getConnection() {
    return rabbit.connect({
      protocol: process.env.AMQP_PROTOCOL,
      hostname: process.env.AMQP_HOST,
      port: process.env.AMQP_PORT,
      username: process.env.AMQP_USER,
      password: process.env.AMQP_PASS,
    });
  }

  static async getChannel() {
    // Setup queue config
    const connection = await rabbit.connect({
      hostname: process.env.AMQP_HOST,
      port: process.env.AMQP_PORT,
      username: process.env.AMQP_USER,
      password: process.env.AMQP_PASSWORD,
    });
    // Create a channel to the queue
    const channel = await connection.createChannel();
    this.channel = channel;
    return {
      channel,
      connection,
    };
  }

  async getChannel() {
    // Setup queue config
    this.connection = await rabbit.connect({
      protocol: process.env.AMQP_PROTOCOL,
      hostname: process.env.AMQP_HOST,
      port: process.env.AMQP_PORT,
      username: process.env.AMQP_USER,
      password: process.env.AMQP_PASS,
    });
    // Create a channel to the queue
    const channel = await this.connection.createChannel();

    this.channel = channel;
    return {
      channel: this.channel,
      connection: this.connection,
    };
  }

  static async closeConnection(connection, channel) {
    // console.log('FECHANDO')
    if (channel) {
      await channel.close();
    }

    if (connection) {
      await connection.close();
    }
  }

  static async sendMessage(queueName, message) {
    const response = await this.channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(message))
    );

    return response;
  }

  async sendMessage(queueName, message) {
    const response = await this.channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(message))
    );

    return response;
  }

  async closeConnection() {
    // console.log('FECHANDO')
    if (this.channel.close) {
      await this.channel.close();
    }

    if (this.connection.close) {
      await this.connection.close();
    }
  }
}

export default Rabbit;
