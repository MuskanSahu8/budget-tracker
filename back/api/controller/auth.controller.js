import { Auth } from "../modal/auth.schema.js";
import jwt from "jsonwebtoken";
import { genToken } from "../utils/genToken.js"
export const signup = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json("all fields are required")
        }
        const isUserExist = await Auth.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                message: "email already exist",

            })
        }
        const user = await Auth.create({
            userName,
            email,
            password,

        });
        return res.status(201).json({
            message: "user registed successfully",
            data: {
                _id: user._id,
                email: user.email,
            },
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });

    }
};
export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "all fields are required"
            });
        }
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "user not found",
            });
        }
        const isPassword = await user.comparePassword(password);
        if (!isPassword) {
            return res.status(400).json({
                message: "password is incorrect",
            });
        }
        const token = await genToken(user._id, user.userName, user.email);
        console.log(token, "test");
        return res.status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000,
                path:"/",
            })
            .json({
                message: "user signin successfully",
                data: {
                    userName:user.userName,
                    email: user.email,
                },
            });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await Auth.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(400).json({
                message: "user not found"
            })
        }
        return res.status(200).json({
            message: "user signin successfully",
            data: {
                _id: user._id,
                userName: user.userName,
                email: user.email
            }
        })

    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const signout = async (req, res, next) => {
    try {
        return res.clearCookie("token",{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path:"/",
        }).status(200).json({
            message: "signout successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        })

    }
}