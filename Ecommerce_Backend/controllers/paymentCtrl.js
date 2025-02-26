const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");

const makePayment = asyncHandler(async (req, res) => {
    try {
        const { cartItems } = req.body;
        const lineItems = cartItems.map(item => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.productId.title,
                        images: [item.productId.images[0].url],
                    },
                    unit_amount: Math.round(item.productId.price * 100),
                },
                quantity: item.quantity,
            }
        });
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.json({id: session.id, message: "Payment Success"});
    } catch (error) {
        throw new Error(error)
    }
});

module.exports = {makePayment};
