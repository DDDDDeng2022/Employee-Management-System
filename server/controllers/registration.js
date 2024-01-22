import { randomBytes } from 'crypto';
import Registration from '../db/models/registration.js';

const sendRegistration = async (req, res) => {
    const { email, firstName, lastName } = req.body;
    if(!email){
        res.status(400).json({message: "Required fields: email are missing"});
        return;
    }
    try{
        let registration = await Registration.findOne({email: email});
        
        //if first time send registration link to this email address
        if(!registration){
            const token = randomBytes(20).toString('hex');
            const response = {
                email: email,
                // firstName: firstName,
                // lastName: lastName,
                token: token,
                updated_at: Date.now(),
            };
           registration = new Registration(response);
        //if generate a new registration link to this email address
        }else{
            const token = randomBytes(20).toString('hex');
            registration.token = token;
            registration.updated_at = Date.now();
        }
        await registration.save();
        res.status(201).json(registration);
    }catch(err){
        res.status(500).json({ message: 'Server Error' });
    }
   
};

const test = async( req, res) => {
    res.status(200).json({message: "test"});
};

export {
    sendRegistration,
    test
};