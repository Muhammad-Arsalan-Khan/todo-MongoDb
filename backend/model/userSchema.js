import { create } from "domain";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    todo : {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model("User", userSchema)
export default User;
