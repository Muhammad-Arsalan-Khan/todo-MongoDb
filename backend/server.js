import express from "express";
const app = express();
const port = 3000;
import mongoose from "mongoose";
import User from "./model/userSchema.js";
import cors from "cors";


//midelware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

//moongoose connection
const URI = `mongodb+srv://arsalan:todo@cluster0.htm4mht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(URI)
.then(() => {
    console.log("MongoDB Connected")
}).catch((err) => {
    console.log("mongoose err",err)
})


app.post("/createtodo", async (req, res)=>{
    try {
        const userModel = await User.create(req.body)
        console.log(userModel)
        res.json({message: "Todo Created"})
    } catch (error) {
        console.log("error todo create",error)
    }
})

app.get("/gettodo", async (req, res)=>{
    try {
        const response = await User.find({}).sort({createdAt: -1})
        const uiRes = response.map(data=> data.todo)
        res.json({message: "Todo Get", data: response})
    } catch (error) {
        console.log("error todo get",error)
    }
})

app.patch("/updatetodo/:id", async (req, res)=>{
    try {
        const response = await User.findByIdAndUpdate(req.params.id, {todo: req.body.updateTodo}, {new: true});
        console.log(response)
        res.json({message: "Todo Updated", id : response._id})
    } catch (error) {
        console.log("error todo update",error)
    }
})

app.delete("/deletetodo/:id", async (req, res)=>{
    try {
        const response = await User.findByIdAndDelete(req.params.id);
        console.log(response, "todo deleted")
        res.json({message: "Todo deleted", id : response._id})
    } catch (error) {
        console.log("error todo update",error)
    }
})


app.delete("/deleteAlltodo", async (req, res)=>{
    try {
        const allIds = req.body
        const response = await User.deleteMany({ _id: allIds});
        console.log("response", response)
        res.json({
            message: "ALL DELETED",
        })
    } catch (error) {
        console.log("error todo deleteAll",error)
    }
})


app.listen(port, () => console.log(`Server Start on port ${port}`));