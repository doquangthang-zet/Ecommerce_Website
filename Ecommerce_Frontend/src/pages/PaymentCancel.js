import React from 'react';
import Meta from '../components/Meta';

const PaymentCancel = () => {
    return (
        <div class="bg-gray-100 h-screen">
            <Meta title="Payment cancel" />
            <div class="bg-white p-6  md:mx-auto">
                <img src="images/cancelled.png" alt="cancel" class="w-16 h-16 mx-auto my-6" />
                <div class="text-center">
                    <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
                    <p class="text-gray-600 my-2">Something went wrong!</p>
                    <p> Sorry for the inconvenience!  </p>
                    <div class="py-10 text-center">
                        <a href="/" class="rounded-3xl text-white bg-cyan-950 px-8 py-2 text-lg hover:bg-orange-500 hover:text-black ml-2">
                            GO BACK 
                    </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentCancel;