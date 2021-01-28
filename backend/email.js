const mail = require('nodemailer')
const { orgmail, orgpass } = require('./config/keys')

const transport = mail.createTransport({
	service: 'Gmail',
	auth: {
		user: orgmail,
		pass: orgpass
	}
})

module.exports = async function sendMail(to, sub, msg) 
{
	const email = {
		from: orgmail,
		to: to,
		subject: sub,
		html: msg
	}

	return err = await transport.sendMail(email, async (err) => {
		return err
	})
}