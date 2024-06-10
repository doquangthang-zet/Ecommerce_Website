const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
    }
},
    {timestamps: true}
);

//Export the model
module.exports = mongoose.model('Cart', cartSchema);