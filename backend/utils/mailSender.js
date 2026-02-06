import nodemailer from "nodemailer";

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        });

        const info = await transporter.sendMail({
        from: `"E-Commerce App" <${process.env.MAIL_USER}>`,
        to: email,
        subject: title,
        html: body,
        });

        return info;
    } catch (error) {
        console.log("Mail Sender Error:", error.message);
    }
};

export default mailSender;
