const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const relativePathTemplate = "../views/mail-template/index.handlebars";
const path = require('path');
const fs = require('fs');

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

    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve(__dirname,'../views/'),
        defaultLayout: false
      },
      viewPath: path.resolve(__dirname, '../views/mail-template/')
    }

    transporter.use('compile', hbs(handlebarOptions));

    let configuration = {
      from: 'noreply@automatizavarejo.com.br',
      to: 'contato@automatizavarejo.com.br',
      subject: subject,
      template: 'mail',
      context: {
        name: name,
        email: email,
        message: message
      }
    }

    transporter.sendMail(configuration, (error, result) => {
      if(error)
        console.log(error);
      else
        return response.status(200).json({ status: 'success', message: 'Email sended.' });
    });
	}
}