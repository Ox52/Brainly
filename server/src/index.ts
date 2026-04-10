import express from "express";
import dotenv from "dotenv"

const app = express()

app.use(express.json())

const PORT = 3000

app.listen( PORT,()=>{console.log("server is running")})