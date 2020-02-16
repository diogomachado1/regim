import Mail from '../../lib/Mail';

class ConfirmEmail {
  get key() {
    return 'ConfirmEmail';
  }

  async handle({ data }) {
    const { name, email, hash } = data;

    await Mail.sendMail({
      to: `${name} <${email}`,
      subject: 'Email de confirmação',
      template: 'confirmEmail',
      context: {
        userName: name,
        link: `http://localhost:3000/${hash}`,
      },
    });
  }
}

export default new ConfirmEmail();
