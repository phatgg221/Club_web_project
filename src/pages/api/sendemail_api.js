import nodemailer from 'nodemailer';
require('dotenv').config();

export default async function handler(req, res) {
  const { email } = req.body;
  const { password} = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:  587,
    secure: false, // true for  465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail account
        pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
    },
    tls: {
      ciphers:'SSLv3'
    }
});

   try {
    let info = await transporter.sendMail({
      from: '"GFCC" <process.env.EMAIL_USER>',
      to: email,
      subject: 'Your password',
      html: `<h1>Hello!</h1>
      <p>Your password is: ${password}</p>`,
      
    });
    console.log(info.messageId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }

}