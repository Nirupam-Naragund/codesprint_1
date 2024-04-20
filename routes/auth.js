import express from 'express';
import User from '../models/User.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import 'dotenv/config';
const router = express.Router();


//* ROUTE 1 : Create a User using: POST "/api/auth/signup". No login required
router.post('/signup', async (req, res) => {

    //* data comimg from body(frontend)
    const { name, email, password } = req.body

    try {
        //* Validation 
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        //* Email Validation 
        if (!email.includes("@")) {
            return res.status(400).json({ error: "Please enter a valid email" })
        }

        //* Find Unique User with email
        const user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ error: "User already exists" })
        }

        //* Generate salt 
        const salt = await bcrypt.genSalt(6);

        //* Hash password 
        const hashedPassword = await bcrypt.hash(password, salt);

        //* Save Data into database
        const newUser = await User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        console.log(newUser);
        res.status(201).json({ success: "Signup Successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/login', async (req, res) => {
    //* data comimg from body(frontend)
    const { email, password } = req.body

    try {
        //* Validation 
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        //* Email Validation 
        if (!email.includes("@")) {
            return res.status(400).json({ error: "Please enter a valid email" })
        }

        //* Find Unique User with email
        const user = await User.findOne({ email });

        console.log(user)

        //* if user not exists with that email
        if (!user) {
            res.status(400).json({ error: "User Not Found" })
        }

        //* matching user password to hash password with bcrypt.compare()
        const doMatch = await bcrypt.compare(password, user.password)
        console.log(doMatch)

        //* if match password then generate token JWT_SECRET
        if (doMatch) {
            const token = jwt.sign({ userId: user.id }, 'codesprint' , {
                expiresIn: '7d'
            })

            res.status(201).json({ token })
        }
        else {
            res.status(404).json({ error: 'Email And Password Not Found' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

// router.post('/increment-term', async (req, res) => {
//     try {
//         //* Check if the request body contains the userId and increment values
//         const { userId, increment } = req.body;

//         //* If userId or increment value is missing or invalid, return an error
//         if (!userId || !increment || typeof increment !== 'boolean') {
//             return res.status(400).json({ error: "Invalid request body. Please provide userId and increment (boolean) fields." });
//         }

//         //* Find the user by their ID
//         const user = await User.findById(userId);

//         //* If user not found, return an error
//         if (!user) {
//             return res.status(404).json({ error: "User not found." });
//         }

//         //* Increment the term field by 1 if increment is true
//         if (increment) {
//             user.flag += 1;
//             await user.save();
//             return res.status(200).json({ message: "Term incremented successfully.", newTermValue: user.flag });
//         } else {
//             return res.status(400).json({ error: "Invalid increment value. It should be true to increment the term." });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

router.post('/increment-flag', async (req, res) => {
    try {
        //* Check if the request body contains the userId and incrementFlag values
        const { userId, incrementFlag } = req.body;

        //* If userId or incrementFlag value is missing or invalid, return an error
        if (!userId || typeof incrementFlag !== 'boolean') {
            return res.status(400).json({ error: "Invalid request body. Please provide userId and incrementFlag (boolean) fields." });
        }

        //* Find the user by their ID
        const user = await User.findById(userId);

        //* If user not found, return an error
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        //* Increment the flag field by 1 if incrementFlag is true
        if (incrementFlag) {
            user.flag = (user.flag || 0) + 1; // Ensure user.flag is initialized
            await user.save();
            return res.status(200).json({ message: "Flag incremented successfully.", newFlagValue: user.flag });
        } else {
            return res.status(400).json({ error: "Invalid incrementFlag value. It should be true to increment the flag." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});


export default router