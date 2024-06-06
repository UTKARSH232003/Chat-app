import User from "../models/user.js";

export const getUsersForSidebars = async(req, res) => {
    try{
        // const loggedInUserId = req.user._id;
        const loggedInUserId = req.user ? req.user._id : null;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.log("Error in getUserForSidebar", error.message);
        res.status(500).json({erro: "Internal server error"})
    }
}