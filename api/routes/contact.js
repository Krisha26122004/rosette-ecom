import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Please provide your name, email, and a message. 🌸" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: process.env.EMAIL_USER, 
            replyTo: email,
            subject: `🌸 New Inquiry from ${name}`,
            text: `
                Hello Admin,
                
                You have received a new message from Rosette.
                
                CUSTOMER DETAILS:
                - Name: ${name}
                - Email: ${email}
                
                MESSAGE:
                ${message}
                
                ---
                You can reply directly to this email to contact the customer. 
                Sent via Rosette Contact Form
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Thank you! Your message has been sent to Rosette. 🌸" });

    } catch (err) {
        console.error("Nodemailer Error:", err);
        res.status(500).json({ error: "Failed to send email. Check your .env configuration." });
    }
});

export default router;
