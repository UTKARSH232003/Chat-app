import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    console.log("this is the userif: ",userId);
    const token = jwt.sign({userId: userId}, process.env.JWT_SECRET, {
        expiresIn : "15d"
    })
    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true,
        sameSite: "strict"
    });
};

export default generateTokenAndSetCookie;