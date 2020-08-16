import { connect } from 'amqplib';

class Rabbit {
  static getConnection() {
    return connect({
      protocol: process.env.AMQP_PROTOCOL,
      hostname: process.env.AMQP_HOST,
      port: process.env.AMQP_PORT,
      username: process.env.AMQP_USER,
      password: process.env.AMQP_PASS,
    });
  }

  static async getChannel() {
    // Setup queue config
    const connection = await connect({
      hostname: process.env.AMQP_HOST,
      port: process.env.AMQP_PORT,
      username: process.env.AMQP_USER,
      password: process.env.AMQP_PASSWORD,
    });
    // Create a channel to the queue
    const channel = await connection.createChannel();

    return {
      channel,
      connection,
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
    const client = await this.getConnection();

    const channel = await client.createChannel();
    await channel.assertQueue(queueName);
    const response = await channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(message))
    );

    if (channel) await channel.close();
    if (client) await client.close();

    return response;
  }
}

export default Rabbit;
