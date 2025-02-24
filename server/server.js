const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Configure CORS to allow requests from any origin
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    console.log('Received request to send email');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'alpiyangini@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'yuafwbdtqqfopxio'
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER || 'alpiyangini@gmail.com',
        to: process.env.EMAIL_USER || 'pihe279@gmail.com',
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Export the Express app as a serverless function
module.exports = app;