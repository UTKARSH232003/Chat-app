import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    }, 
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: "",
    },
}, {timestamps: true}); // by adding timestamps we can see the updatedtime and ceratedtime

const User = mongoose.model("User", userschema);

export default User;