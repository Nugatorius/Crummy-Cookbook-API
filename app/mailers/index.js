const mailer = require('nodemailer');
const passwordGenerator = require('generate-password');
require('../utils/logger');
process.env.NODE_ENV === 'test' ? require('dotenv').config({ path: '.test.env' }) : require('dotenv').config();

const sendPassword = async (to, from = process.env.USER_EMAIL, subject) => {
  try {
    const transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
      }
    });
    const password = passwordGenerator.generate({
      length: 16,
      numbers: true
    });
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: password
    };
    await transporter.sendMail(mailOptions);
    return password;
  }
  catch (exception) {
    throw new Error(exception);
  }
};

module.exports = { sendPassword };
