const express=require("express");

const app=express();

const userController=require("./controllers/user.controllers");
const todoController=require("./controllers/todo.controllers")
const {register,login}=require("./controllers/auth.controller");


app.use(express.json());

app.use("/users",userController)
app.post("/register",register);
app.post("/login",login)
app.use("/todos",todoController)
module.exports=app;