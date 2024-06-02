import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/token.js";
import user from "../models/user.js";

export const login = async(req, res) =>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({error: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({error: "Invalid Password"});
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id : user._id,
            fullname : user.fullname,
            username: user.username,
            profilePic: user.profilePic
        })
    }catch(error){
        console.log("Error loging in", error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
    console.log("this is login");
}
export const signup = async(req, res) =>{
    try {
        const {fullname,username,password,confirmPassword,gender} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error: "Password don't match"});
        }
        
        const User = await user.findOne({username});
        if(User){
            return res.status(400).json({error: "Username already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new user({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic
        });

        await newUser.save();
        if(newUser){
            await generateTokenAndSetCookie();
           res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic,
                gender: newUser.gender
            });
        }
    }catch(error){
        console.log("Error signing up", error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
};
export const logout = (req, res) =>{
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error loging out", error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
}
