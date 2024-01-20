import PersonalInfo from "../db/models/personalInfo";

/* seems no need anymore because requirement want
 *     search result change on every character clicked
 */
const searchUser = async (req, res) => {
    const { search_element } = req.body;
    console.log(search_element);

    // await PersonalInfo.find;
};

export default searchUser;
