require('dotenv').config();
const nodemailer=require('nodemailer');

const sendEmail = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure:false,
        auth: {
            user: process.env.ETHEREAL_USER,
            pass: process.env.ETHEREAL_PASS,
        }
    })    
    const mailOption = {
        from: '<shubham.wappnet@gmail.com>',
        to: to,
        subject: subject, 
        text: message,
    }
    try {
        const info = await transporter.sendMail(mailOption)
        console.log(`Email sent: ${info.response}`);
    }
    catch (error) {
        console.log(`Error sending email: ${error.message}`)
    }
}

module.exports = sendEmail;