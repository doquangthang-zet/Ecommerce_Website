import React, { useEffect, useState } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {Link} from "react-router-dom";
import { RiDeleteBack2Fill  } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProdCart, getUserCart, updateProdCartQuantity } from '../features/user/userSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const userCartState = useSelector(state => state?.user?.userCart);
    const [quantityUpdateDetails, setQuantityUpdateDetails] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);

    useEffect(() => {
        dispatch(getUserCart());
    }, []);

    useEffect(() => {
        if(quantityUpdateDetails !== null) {
            updateAProduct(quantityUpdateDetails);
        }
    }, [quantityUpdateDetails]);

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < userCartState?.length; i++) {
            sum = sum + (Number(userCartState[i]?.quantity) * Number(userCartState[i]?.price));
        }
        setTotalAmount(sum);
    }, [userCartState]);

    const deleteAProduct = (id) => {
        dispatch(deleteProdCart(id));
        setTimeout(() => {
            dispatch(getUserCart());
        }, 1000);
    }

    const updateAProduct = (quantityUpdateDetails) => {
        dispatch(updateProdCartQuantity(quantityUpdateDetails));
        setTimeout(() => {
            dispatch(getUserCart());
        }, 200);
    }
  return (
    <>
        <Meta title="Cart" />
        <BreadCrum title="Cart" />

        <section className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                        {/* Cart header */}
                        <div className="flex items-center justify-between border-b border-gray-300">
                            <h4 className='text-medium font-medium text-gray-500 w-2/5'>Product</h4>
                            <h4 className='text-medium font-medium text-gray-500 w-1/10'>Price</h4>
                            <h4 className='text-medium font-medium text-gray-500 w-15%'>Quantity</h4>
                            <h4 className='text-medium font-medium text-gray-500 w-15%'>Total</h4>
                        </div>

                        {/* Cart data */}
                        {
                            userCartState && userCartState?.map((item, index) => {
                                return (
                                    <div key={index} className="flex items-center justify-between border-b border-gray-300 mb-2">
                                        {/* product infor */}
                                        <div className='w-1/5 md:w-2/5 flex items-center gap-3'>
                                            <div className='w-full md:w-1/4'>
                                                <img src={item?.productId?.images[0]?.url} className='' alt="product image" />
                                            </div>
                                            <div className="hidden md:block md:w-3/4">
                                                <h5 className='text-base text-gray-500'>{item?.productId?.title?.length > 5 ? item?.productId?.title?.substr(0,5) + "..." : item?.productId?.title}</h5>
                                                <p className='text-base text-gray-500'>Size: XL</p>
                                                <p className='text-base text-gray-500 flex gap-3 items-center'>Color: <span style={{backgroundColor: item?.color?.title}} className='w-5 h-5 rounded-full'></span></p>
                                            </div>
                                        </div>
                                        {/* Price */}
                                        <div className='w-1/10'>
                                            <h5 className='text-sm md:text-base text-gray-500'>${item?.price}</h5>
                                        </div>
                                        {/* Quantity */}
                                        <div className='w-10 md:w-15% flex items-center md:gap-2'>
                                            <div>
                                                <input 
                                                    onChange={(e) => setQuantityUpdateDetails({id: item?._id, newQuantity: e.target.value})} 
                                                    type="number" 
                                                    name="quantity" 
                                                    id="quantity" 
                                                    className="flex-1 w-9 md:w-16 text-center border border-gray-800 rounded-md py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                                    min={1} 
                                                    max={item?.productId?.quantity} 
                                                    value={item?.quantity} />
                                            </div>
                                            <div>
                                                <RiDeleteBack2Fill onClick={() => deleteAProduct(item?._id)} className='text-red-600 p-1 h-5 w-5 md:w-10 md:h-10 md:p-2 text-4xl bg-cyan-900 rounded-full' />
                                            </div>
                                        </div>
                                        {/* Total */}
                                        <div className='w-15%'>
                                            <h5 className='text-sm md:text-base'>${item?.price * item?.quantity}</h5>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>

                    <div className="col-span-12 py-2 mt-4">
                        <div className="flex justify-center md:justify-between items-baseline">
                            <Link to="/store" className='hidden md:block rounded-3xl text-white bg-cyan-950 px-8 py-2 text-lg hover:bg-orange-500 hover:text-black ml-2 mt-5'>Continue to shopping</Link>
                            
                            {
                                (totalAmount !== null || totalAmount !== 0) && 
                                <div className='flex flex-col justify-center items-center gap-2 md:items-end'>
                                    <h4 className='text-lg font-medium'>Subtotal: ${totalAmount ? totalAmount : 0}</h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link to="/checkout" className='w-2/3 text-center rounded-2xl text-sm ml-1 px-3 py-1 mt-2 md:rounded-3xl text-white bg-cyan-950 lg:px-8 lg:py-3 lg:text-lg hover:bg-orange-500 hover:text-black lg:ml-2 lg:mt-5'>Checkout</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Cart