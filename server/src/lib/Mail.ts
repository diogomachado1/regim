import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';
import SES from 'aws-sdk/clients/ses';
import mailConfig from '../config/mail';

class SenderMail {
  transporter: Mail;
  constructor() {
    this.transporter = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });

    this.configureTemplates();
  }

  configureTemplates(): void {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMail(message): Promise<any> {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new SenderMail();
