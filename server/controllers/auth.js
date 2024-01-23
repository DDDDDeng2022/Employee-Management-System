import User from "../db/models/user.js";
import Role from "../db/models/role.js";
// import signupUser from "../services/user/signup.js"

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    const result = await User.findOne({ username: username })
        .populate("role")
        .populate({
            path: "personal_info",
            populate: [
                { path: "address", model: "Address" },
                { path: "reference", model: "Contact" },
                { path: "emergency_contact", model: "Contact" },
                { path: "opt", model: "OPT" },
            ],
        })
        .then((user) => {
            console.log(user);
            if (!user) {
                res.status(403).json({ message: "Invalid username" });
            } else if (user.password !== password) {
                res.status(403).json({ message: "Invalid password" });
            } else {
                // const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3d' });
                res.status(201).json({ ...user });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
};

const signup = async (req, res) => {
    try {
        const create_user_data = req.body;
        const role = await Role.findOne({ name: create_user_data.role });
        const user = new User({ ...create_user_data, role });
        if (!user.username || !user.password) {
            res.status(400).json({ message: "Please provide required fields" });
        } else if (!user.email) {
            res.status(400).json({
                message:
                    "Error finding email, please contact with HR for validation",
            });
        } else {
            await user.save().then((user) => {
                // const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3d' });
                res.status(201).json(user);
            });
        }
    } catch (err) {
        res.status(500).json({ err, message: "Server Error" });
    }
};

export { login, signup };
