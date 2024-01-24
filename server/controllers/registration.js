import { randomBytes } from "crypto";
import Registration from "../db/models/registration.js";
import sendMail from "../services/mailer.js";

const createRegistration = async (req, res) => {
    const { first_name, last_name } = req.body;
    const email = req.body?.email.toLowerCase();
    if (!email || !first_name || !last_name) {
        res.status(400).json({ message: "Required fields are missing" });

        return;
    }

    const response = await sendMail({ email, first_name, last_name });
    if (response.success) {
        try {
            const registration_info = {
                email: email,
                first_name: first_name,
                last_name: last_name,
                token: response.token,
                updated_at: Date.now(),
                link: response.link,
            };
            const new_registration = new Registration(registration_info);
            await new_registration.save().then((result) => {
                res.status(201).json(result);
            });
        } catch (err) {
            res.status(500).json({ err, message: "Registration save error" });
        }
    } else {
        res.status(500).json({
            err: response.err,
            message: "Error sending email",
        });
    }
};

const getRegistration = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Required fields: email are missing" });
        return;
    }
    try {
        const registration = await Registration.findById(id);
        res.status(200).json(registration);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};
const getAllRegistors = async (req, res) => {
    try {
        const registors = await Registration.find();
        res.status(200).json(registors);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

const test = async (req, res) => {
    res.status(200).json({ message: "test" });
};

export { createRegistration, getRegistration, getAllRegistors };
