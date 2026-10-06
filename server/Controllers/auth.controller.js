import User from "../Models/user.model.js"
import genToken from "../Configs/token.js"



export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body
        if (!name || !email) {
            return res.status(400).json({ message: "name and email are required" })
        }   //400 as frontend error, not input
        //find user through email
        let user = await User.findOne({ email }) //finding in database
        if (!user) {
            user = await User.create({
                name, email //create user and email
            })
        }
        //generate token using genTken form token.js
        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: false, 
            secure: true, 
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `google auth error ${error}` })
    }
}

export const logOut = async (req, res) => {
    try {
        await res.clearCookie("token", {
            httpOnly:false, 
            secure:true, 
            sameSite: "none",
        })
        return res.status(200).json({ message: "LogOut Successfully" })

    } catch (error) {
        return res.status(500).json({ message: `LogOut Failed ${error}` })

    }
}

