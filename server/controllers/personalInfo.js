import User from "../db/models/user.js";
import PersonalInfo from "../db/models/personalInfo.js";
import Contact from "../db/models/contact.js";
import Address from "../db/models/address.js";
import getUserById from "../services/getUserById.js";
import getPersonalInfoById from "../services/getPersonalInfoById.js";
import updateRefs from "../services/updateRefs.js";

const createPersonalInfo = async (req, res) => {
    try {
        const user_id = req.params?.id;
        const personal_info = req.body;

        // Create and convert reference & emergency_contact to Object_id
        await Contact.bulkWrite([
            {
                insertOne: {
                    document: personal_info.reference,
                },
            },
            {
                insertOne: {
                    document: personal_info.emergency_contact,
                },
            },
        ]).then((result) => {
            personal_info.reference = result.insertedIds["0"];
            personal_info.emergency_contact = result.insertedIds["1"];
        });

        // Create and convert current_address to Object_id
        const new_address = new Address({ ...personal_info.current_address });
        await new_address.save().then((address) => {
            personal_info.current_address = address._id;
        });

        const pinfo = new PersonalInfo({ ...personal_info });
        await pinfo.save().then(async (info) => {
            const user = await getUserById(user_id);
            await User.findOneAndUpdate(
                { _id: user._id },
                { ...user, personal_info: info._id }
            ).then((result) => {
                res.status(200).json(result);
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            err,
            message: "Error on saving personal info.",
        });
    }
};

const updatePersonalInfo = async (req, res) => {
    try {
        const user_id = req.params?.id;
        const update_info = req.body;
        const update_fields = {
            current_address: Address,
            reference: Contact,
            emergency_contact: Contact,
        };

        const user = await getUserById(user_id);
        const personal_info = await getPersonalInfoById(user.personal_info);

        if (Object.keys(update_fields).some((field) => update_info[field])) {
            await updateRefs({ update_fields, update_info, personal_info });
        }

        await PersonalInfo.findOneAndUpdate(
            { _id: user.personal_info },
            { ...personal_info, ...update_info }
        ).then((info) => {
            res.status(201).json({ message: "Successfully updated." });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            err,
            message: "Error on saving personal info.",
        });
    }
};

export { createPersonalInfo, updatePersonalInfo };
