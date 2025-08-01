import {User} from '../models/user.model.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async (req, res) => {
  try {
    const { fullname, email ,phoneNumber, password,role } = req.body;
    console.log('Received registration data:', { fullname, email, phoneNumber, password, role });
    console.log('File:', req.file);
    
    if (!fullname || !email || !phoneNumber || !password || !role) {
      console.log('Missing fields:', { fullname: !!fullname, email: !!email, phoneNumber: !!phoneNumber, password: !!password, role: !!role });
      return res.status(400).json({ message: 'All fields are required',  success: false  });
    }
    const file = req.file;
    let cloudResponse = null;
    
    if (file) {
      console.log('Uploading file to Cloudinary...');
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "profile-photos",
      });
      console.log('Cloudinary upload successful:', cloudResponse.secure_url);
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const userData = {
      fullname,
      email,
      phoneNumber: Number(phoneNumber),
      password: hashedPassword,
      role,
    };
    
    if (cloudResponse) {
      userData.profile = {
        profilePicture: cloudResponse.secure_url,
      };
    }
    
    console.log('Creating user with data:', userData);
    await User.create(userData);
    console.log('User created successfully');
    return res.status(201).json({ message: 'User registered successfully', success: true });   
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error: ' + error.message, success: false });
  }

};

export const login = async (req, res) => {
    try {
        const { email, password , role  } = req.body;
        console.log('Login attempt:', { email, password: password ? '***' : 'missing', role });
        
        if (!email || !password || !role) {
            console.log('Missing fields:', { email: !!email, password: !!password, role: !!role });
            return res.status(400).json({ message: 'Email and password are required', success: false });
        }
        let user = await User.findOne({ email });
        console.log('User found:', user ? 'Yes' : 'No');
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials', success: false });
        }
        
        const isPasswordMatch = await bycrypt.compare(password, user.password);
        console.log('Password match:', isPasswordMatch);
        console.log('User role:', user.role, 'Requested role:', role);
        
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials', success: false });
        }
        
        if (user.role !== role) {
            return res.status(403).json({ message: 'Access denied for this role', success: false });
        }
        const tokenData = {
            UserId: user._id,
            
        }
        const token = await  jwt.sign(tokenData, process.env.SECRET_KEY || 'fallback-secret-key', { expiresIn: '1h' });
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
            console.log('Received update profile request:', req.body);
            const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file ;
        const fileUri=getDataUri(file);
            console.log('File URI:', fileUri);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
  resource_type: "raw", // 🔥 FOR PDFs & any non-image file
  folder: "resumes",    // optional: organizes files
});


        if (!fullname || !email || !phoneNumber || !bio) {
                return res.status(400).json({ 
                    message: 'All fields are required',
                     success: false });
            };
        //cloudinary ayega idher     
            

            let skillArray = [];
            if (skills) {
                skillArray = skills.split(',').map(s => s.trim()).filter(s => s);
            }

            const userId= req.id;
            let user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found', success: false });
            }

            if(fullname) user.fullname = fullname;
            if(email) user.email = email;
            if(phoneNumber) user.phoneNumber = Number(phoneNumber);
            
            // Update profile object
            if (!user.profile) {
                user.profile = {};
            }
            if(bio) user.profile.bio = bio;
            if(skillArray && skillArray.length > 0) user.profile.skills = skillArray;
            
            if (cloudResponse){
                user.profile.resume = cloudResponse.secure_url;
                user.profile.resumeOriginalName = file.originalname;
            }
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
            console.log('Profile update error:', error);
            res.status(500).json({ message: 'Server error: ' + error.message, success: false });
        }
    }
