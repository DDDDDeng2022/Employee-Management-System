import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import jwt from "jsonwebtoken";

const config = {
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
};

const mailGenerator = new Mailgen({
    theme: "salted",
    product: {
        name: "Manage U Future",
        link: "http://localhost:3000/",
    },
});

async function sendMail({ email, first_name, last_name }) {
    const transporter = nodemailer.createTransport(config);

    const token = jwt.sign(
        { email, first_name, last_name },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
    );
    const signupLink = `http://localhost:3000/signup/${token}`;

    const emailBody = {
        body: {
            name: `${first_name} ${last_name}`,
            intro: "Welcome to Chuwa! We are happy to see you onboard.",
            action: {
                instructions:
                    "Please click the following button to create your P2HR account:",
                button: {
                    color: "#61dafb",
                    text: "Sign up",
                    link: signupLink,
                },
            },
            outro: [
                "This link will be expired in 3 hours, please contact us if you missed it.",
                `If you have any question, please contact us: ${process.env.EMAIL}`,
                "This email is system generated, please do not response.",
            ],
        },
    };

    const emailContent = mailGenerator.generate(emailBody);
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Welcome aboard, ${first_name}!`,
        html: emailContent,
    };

    const result = await transporter.sendMail(mailOptions).then((info) => {
        if (info.rejected.length === 0) {
            return { token, success: true, link: signupLink };
        } else {
            return { success: false, error: "Error sending email" };
        }
    });

    return result;
}

export default sendMail;
