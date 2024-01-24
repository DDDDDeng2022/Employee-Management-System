import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import 'dotenv/config';

const sendMail = async (req, res) => {
    const { targetEmail, token } = req.body;
    if(!targetEmail || !token ){
        res.status(400).json({msg: "target email address or token missing"});
        return;
    }
    const config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    };
    const transporter = nodemailer.createTransport(config);
    
    const mailGenerator = new Mailgen({
        theme:'default',
        product: {
            name: 'Manage U Future',
            link: 'https://mailgen.js'
        }
    });
    const link = "http://localhost:3000/home/visa/?email="+targetEmail+"/?token"+token;
    const content = {
        body:{
            intro: "Welcome to the on boarding process! Here is your registration invitation from Manage Your Future. Please do NOT share link this with others.",
            table:{
                data:
                    [
                       {
                        link: link,
                        expires_in: '30 mins' 

                       }
                    ]
                
            }
        }
    };
    
    const mailContent = mailGenerator.generate(content);
    const mail = {
        from: process.env.EMAIL,
        to: targetEmail,
        subject: "registration invitation",
        html: mailContent,
    };
    
    transporter.sendMail(mail).then(() => {
        return res.status(200).json({msg: `the email is sent to ${targetEmail}`});
    }).catch((err) => {
        return res.status(500).json({msg: `internal error when sending email to ${targetEmail}`, err: err});
    });
};

export default sendMail;
