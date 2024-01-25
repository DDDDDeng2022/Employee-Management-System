import User from "../db/models/user.js";
import Role from "../db/models/role.js";
// import signupUser from "../services/user/signup.js"
import jwt from "jsonwebtoken";
import Registration from "../db/models/registration.js"

const decodeJWT = async ({ token, res }) => {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const isTokenExpired = decoded.exp < Date.now() / 1000;

    if (isTokenExpired) {
        res.status(401).json({ message: "Token expired" });
    }
    return decoded;
};

const checkLogin = async (req, res) => {
    const { token } = req.body;
    const decoded = await decodeJWT({ token, res });

    await User.findById(decoded?.id)
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
            res.status(201).json({ ...user._doc });
        })
        .catch((err) => {
            res.status(500).json({ err, message: "Server Error" });
        });
};

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
                const token = jwt.sign(
                    { id: user._id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "3d" }
                );
                res.status(201).json({ ...user, token });
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
        const decoded = await decodeJWT({ token: create_user_data.token, res });
        delete create_user_data["token"];

        const role = await Role.findOne({ name: create_user_data.role });
        const user = new User({
            ...create_user_data,
            role,
            email: decoded.email,
        });
        if (!user.username || !user.password) {
            res.status(400).json({ message: "Please provide required fields" });
        } else if (!user.email) {
            res.status(400).json({
                message:
                    "Registration link error, please contact with HR for validation",
            });
        } else {
            await user.save().then(async (curr_user) => {
                await Registration.findOneAndUpdate({ email: curr_user.email }, { status: true });
                const token = jwt.sign(
                    { id: user._id, email: curr_user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "3d" }
                );
                res.status(201).json({ ...curr_user, token });
            });
        }
    } catch (err) {
        res.status(500).json({ err, message: "Server Error" });
    }
};

const decodeToken = async (req, res) => {
    const { token } = req.body;
    try {
        const decoded = await decodeJWT({ token, res });
        res.status(201).json({ ...decoded });
    } catch (err) {
        res.status(500).json({ err, message: "Token invalid" });
    }
}

export { login, signup, checkLogin, decodeToken };
