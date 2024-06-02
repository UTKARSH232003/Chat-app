import User from "../models/user.js";

export const getUsersForSidebars = async(req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id: { $ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUser);
    }
    catch(error){
        console.log(" this is the error ", error);
        res.status(500).json({erro: "Internal server error"})
    }
}