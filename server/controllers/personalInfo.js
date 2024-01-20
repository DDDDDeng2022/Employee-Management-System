import User from "../db/models/user.js";
import PersonalInfo from "../db/models/personalInfo.js";
import Contact from "../db/models/contact.js";
import Address from "../db/models/address.js";
import getUserById from "../services/getUserById.js";
import getPersonalInfoById from "../services/getPersonalInfoById.js";
import updateRef from "../services/updateRef.js";

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
            await new User({ ...user, personal_info: info._id }).save();
            res.status(200).json(info);
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

        const user = await getUserById(user_id);
        const personal_info = await getPersonalInfoById(user.personal_info);

        if (
            update_info.current_address ||
            update_info.reference ||
            update_info.emergency_contact
        ) {
            const update_fields = {
                current_address: Address,
                reference: Contact,
                emergency_contact: Contact,
            };
            await updateRef({ update_fields, update_info, personal_info });
            // if (update_info.current_address) {
            //     const curr_address = await Address.findById(
            //         personal_info.current_address
            //     );
            //     await Address.findOneAndUpdate(
            //         { _id: personal_info.current_address },
            //         { ...curr_address, ...update_info.current_address }
            //     );
            // }

            // if (update_info.reference) {
            //     const curr_reference = await Contact.findById(
            //         personal_info.reference
            //     );
            //     await Contact.findOneAndUpdate(
            //         { _id: personal_info.reference },
            //         { ...curr_reference, ...update_info.reference }
            //     );
            // }

            // if (update_info.emergency_contact) {
            //     const curr_emergency_contact = await Contact.findById(
            //         personal_info.emergency_contact
            //     );
            //     await Contact.findOneAndUpdate(
            //         { _id: personal_info.emergency_contact },
            //         {
            //             ...curr_emergency_contact,
            //             ...update_info.emergency_contact,
            //         }
            //     );
            // }
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
