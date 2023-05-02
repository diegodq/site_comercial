const nodemailer = require('nodemailer');

module.exports = {
	async home(request, response)
	{
		response.render('home');
	},

	async sendEmail(request, response)
	{
		const { name, email, subject, message } = request.body;

    let transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
			port: 465,
			auth: {
        user: 'noreply@automatizavarejo.com.br',
        pass: '@Senha123'
			},
      tls: { rejectUnauthorized: false }
    });

    let configuration = {
      from: 'noreply@automatizavarejo.com.br',
      to: 'contato@automatizavarejo.com.br',
      subject: subject,
      text: `Nome do contato: ${name}\n email do contato: ${email} \n Mensagem: ${message}`
    }

    transporter.sendMail(configuration, (error, result) => {
      if(error)
        console.log(error);
      else
        return response.status(200).json({ status: 'success', message: 'Email sended.' });
    });
	}
}