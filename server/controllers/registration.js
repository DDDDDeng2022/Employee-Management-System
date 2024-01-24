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
            let registration = await Registration.findOne({ email: email });
            //if first time send registration link to this email address
            if (!registration) {
                const token = response.token;
                const registration_info = {
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    token: token,
                    link: response.link,
                };
                registration = new Registration(registration_info);
                //if generate a new registration link to this email address
            } else {
                const token = response.token;
                registration.token = token;
                registration.updated_at = Date.now();
                registration.link = response.link;
            }
            await registration.save().then((reg) => {
                res.status(201).json(reg);
            });
        } catch (err) {
            res.status(500).json({ message: "Server Error" });
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
