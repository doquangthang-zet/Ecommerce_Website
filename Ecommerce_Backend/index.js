const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRoute = require('../routes/authRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//API route for users
app.use("/api/user", authRoute);

// app.use("/", (req, res) => {  
//     res.send("Hello from backend!");
// });

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`); 
}); 