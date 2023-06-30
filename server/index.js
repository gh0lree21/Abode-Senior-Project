const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const messagesRoute = require('./routes/messagesRoute');


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection Successful")
}).catch((error) => {
    console.log(error.message);
});



const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`)
})