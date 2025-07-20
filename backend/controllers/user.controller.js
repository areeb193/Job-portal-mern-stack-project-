import {User} from '../models/user.model.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { fullname, email ,phoneNumber, password,role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: 'All fields are required',  success: false  });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,   
    });
    return res.status(201).json({ message: 'User registered successfully', success: true });   
  } catch (error) {
    console.log(error);
  }

};

export const login = async (req, res) => {
    try {
        const { email, password , role  } = req.body;
        if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email and password are required', success: false });
        }
        let user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ message: 'Invalid credentials', success: false });
        }
        const isPasswordMatch = await bycrypt.compare(password, user.password);
        if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid credentials', success: false });
        }
        if (user.role !== role) {
            return res.status(403).json({ message: 'Access denied for this role', success: false });
        }
        const tokenData = {
            UserId: user._id,
            
        }
        const token = await  jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1h' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpOnly: true, secure: 'strict'}).json({
            message: `Login successful ${user.fullname}`,
            user,
            success: true,})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
    }


    export const logout = async (req, res) => {
        try {
            return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, secure: 'strict' }).json({
                message: 'Logout successful',
                success: true,
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error', success: false });
        }
    }

    export const updateProfile = async (req, res) => {
        try {
            const { fullname, email, phoneNumber, bio,skill } = req.body;
            const file = req.file ;
            if (!fullname || !email || !phoneNumber || !bio || !skill) {
                return res.status(400).json({ 
                    message: 'All fields are required',
                     success: false });
            };
        //cloudinary ayega idher     


            let skillArray = [];
            if (skill) {
                skillArray = skill.split(',');
            }

            const userId= req.id;
            let user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found', success: false });
            }

            if(fullname) user.fullname = fullname;
            if(email) user.email = email;
            if(phoneNumber) user.phoneNumber = phoneNumber;
            if(bio) user.bio = bio;
            if(skillArray) user.skillArray = skillArray;
            
            await user.save();
             user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }
            return res.status(200).json({ message: 'Profile updated successfully', success: true, user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error', success: false });
        }
    }
