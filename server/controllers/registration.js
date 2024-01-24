import { randomBytes } from 'crypto';
import Registration from '../db/models/registration.js';

const createRegistration = async (req, res) => {
    const { email, firstName, lastName } = req.body;
    if(!email){
        res.status(400).json({message: "Required fields: email are missing"});

        return;
    }
    try {
        let registration = await Registration.findOne({ email: email });
        const baseUrl = "http://localhost:3000/";
        //if first time send registration link to this email address
        if (!registration) {
            const token = randomBytes(20).toString('hex');
            const response = {
                email: email,
                first_name: first_name,
                last_name: last_name,
                token: token,
                updated_at: Date.now(),
                link: `${baseUrl}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`

            };
            registration = new Registration(response);
            //if generate a new registration link to this email address
        } else {
            const token = randomBytes(20).toString('hex');
            registration.token = token;
            registration.updated_at = Date.now();
            registration.link = `${baseUrl}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
        }
        await registration.save();
        res.status(201).json(registration);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }

};

const getRegistration = async (req, res) =>{
    const { id } = req.params;
    if(!id){
        res.status(400).json({message: "Required fields: email are missing"});
        return;
    }
    try{
        const registration = await Registration.findById(id);
        res.status(200).json(registration);
    }catch(err){
        res.status(500).json({ message: 'Server Error' });
    }
};
const getAllRegistors = async (req, res) => {
    try {
        const registors = await Registration.find();
        res.status(200).json(registors);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }

};

const test = async (req, res) => {
    res.status(200).json({ message: "test" });
};
   

export {
    createRegistration,
    getRegistration,
    getAllRegistors,
};