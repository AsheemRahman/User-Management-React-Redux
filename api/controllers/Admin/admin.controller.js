import userSchema from '../../models/user.model.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const adminLogin = async (req, res, next) => {
    try {
        let { username, password } = req.body;
        if (!username || !password) {
            res.status(404).json({ message: "All fields are required" });
            return;
        }
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            let payload = {
                isAdmin: true,
            }
            let jwtSecretKey = process.env.JWT_SECRET || '';
            let token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
            res.cookie('Admin_Token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24
            }).status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        let userList = await userSchema.find();
        if (!userList) {
            res.status(404).json({ message: "There is no user details" });
            return;
        }
        let userDetails = userList.map((ele) => {
            return {
                name: ele.username,
                email: ele.email,
                id: ele._id
            }
        })
        res.status(200).json({ message: "user details retrieved successfully", users: userDetails })

    } catch (error) {
        next(error);
    }
}



export const addUser = async (req, res, next) => {
    try {
        const { userName, userEmail, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new userSchema({ username: userName, email: userEmail, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(404).json({ message: "Cannot find the user without id" });
            return;
        }
        let deletedUser = await userSchema.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).json({ message: "user deleted successfully" });
        } else {
            res.status(404).json({ message: "Cannot delete the user" });
        }
    } catch (error) {
        next(error);
    }
}


export const editUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { name, email, password } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required.' });
        }
        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);
        user.username = name;
        user.email = email;

        if (password) {
            user.password = bcryptjs.hashSync(password, 10);
        }

        await user.save();
        res.status(200).json({ message: 'User details updated successfully', user });
    } catch (error) {
        next(error)
    }
}

export const signout = (req, res) => {
    try {
        res.clearCookie('Admin_Token').status(200).json('Signout success!');
    } catch (error) {
        console.error("Sign out error:", error);
        res.status(500).json({ message: "An error occurred during sign out." });
    }
};


