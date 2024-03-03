const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRoute = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const productRoute = require('./routes/productRoutes');
const blogRoute = require('./routes/blogRoutes');
const categoryRoute = require('./routes/productCategoryRoutes');
const blogCategoryRoute = require('./routes/blogCategoryRoutes');
const brandRoute = require('./routes/brandRoutes');
const colorRoute = require('./routes/colorRoutes');
const couponRoute = require('./routes/couponRoutes');
const enquiryRoute = require('./routes/enquiryRoutes');
const morgan = require("morgan");

dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//API route for users
app.use("/api/user", authRoute);

//API route for product
app.use("/api/product", productRoute);

//API route for blog
app.use("/api/blog", blogRoute);

//API route for product category
app.use("/api/productCategory", categoryRoute);

//API route for blog category
app.use("/api/blogCategory", blogCategoryRoute);

//API route for brand
app.use("/api/brand", brandRoute);

//API route for coupon
app.use("/api/coupon", couponRoute);

//API route for color
app.use("/api/color", colorRoute);

//API route for color
app.use("/api/enquiry", enquiryRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`); 
}); 