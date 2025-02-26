import React, { useEffect, useState } from 'react'
import {NavLink, Link} from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { createOrder, makePayment } from '../features/user/userSlice';

const Checkout = () => {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state?.user?.userCart);
    const [totalAmount, setTotalAmount] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [items, setItems] = useState([]);

    let shippingSchema = Yup.object({
          name: Yup.string().required("Name is required!"),
          email: Yup.string().email("Invalid email address!").required("Email is required!"),
          country: Yup.string().required("Country is required!"),
          city: Yup.string().required("City is required!"),
          address: Yup.string().required("Address is required!"),
          phone: Yup.number().required("Mobile is required!"),
      });
    
    
      const formik = useFormik({
          initialValues: {
            name: '',
            email: '',
            country: "",
            city: "",
            address: "",
            phone: "",
          },
          validationSchema: shippingSchema,
          onSubmit: values => {
            setShippingInfo(values);
            dispatch(createOrder({
                shippingInfo: values,
                orderItems: items,
                totalPrice: totalAmount,
                totalPriceAfterDiscount: totalAmount,
            }));
            dispatch(makePayment(cartState));
          },
      });

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < cartState?.length; i++) {
            sum = sum + (Number(cartState[i]?.quantity) * Number(cartState[i]?.price));
        }
        setTotalAmount(sum);
    }, [cartState]);

    useEffect(() => {
        let cartProducts = [];
        for (let i = 0; i < cartState?.length; i++) {
            cartProducts.push({
                product: cartState[i]?.productId._id,
                color: cartState[i]?.color._id,
                quantity: cartState[i]?.quantity,
                price: cartState[i]?.productId.price,
            });
        }
        setItems(cartProducts);
    }, [])
    
    // useEffect(() => {
    //     if() 
    // })
  return (
    <>
        <div className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
            <div className="container mx-auto">
                {/* Title and breadcrumbs */}   
                <div className="grid sm:px-10 lg:px-14 xl:px-30">
                    <a href="/" className="text-2xl font-bold text-gray-800 px-4 pt-8">E-commerce</a>
                    
                    <nav className="flex px-4 pb-4" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                    </svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <a href="/checkout" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Information</a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <a href="/checkout" className="ms-1 text-sm font-medium text-gray-500 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Shipping</a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <a href="/checkout" className="ms-1 text-sm font-medium text-gray-500 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Payment</a>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Order summary and User details  */}   
                <div className="grid sm:px-10 lg:grid-cols-2 lg:px-14 xl:px-30">
                    <div className="px-4 pt-8">
                        <p className="text-xl font-medium">Order Summary</p>
                        <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                            {
                                cartState && cartState.map((item, index) => {
                                    return (
                                        <div key={index} className="flex flex-col items-center rounded-lg bg-white sm:flex-row">
                                            <div className="m-2 h-24 w-28 rounded-md border relative">
                                                <span className="absolute top-0 right-0 rounded-full h-5 w-5 text-center bg-cyan-950 text-white">{item?.quantity}</span>
                                                <img className="object-cover object-center" src={item?.productId?.images[0]?.url} alt="" />
                                            </div>
                                            <div className="flex w-full flex-col items-center px-4 py-4">
                                                <span className="font-semibold text-center">{item?.productId?.title}</span>
                                                <span style={{backgroundColor: item?.color?.title}} className='w-5 h-5 rounded-full float-right'></span>
                                                <p className="text-lg font-bold">${item?.productId?.price}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="border-b border-gray-400 py-1">
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                <p className="text-md font-semibold text-gray-900">${totalAmount ? totalAmount : "0"}</p>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Shipping</p>
                                <p className="text-md font-semibold text-gray-900">${totalAmount ? "0" : "0"}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between border-b border-gray-400 py-1">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-lg font-semibold text-gray-900">${totalAmount ? totalAmount : "0"}</p>
                        </div>
                    </div>
                    
                    <form className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0" onSubmit={formik.handleSubmit}>
                        <p className="pt-3 text-xl font-medium">Delivery Details</p>
                        <p className="py-3 text-gray-400">Complete your order by providing your delivery details.</p>

                        <div className="grid grid-cols-1 gap-1 md:gap-4 sm:grid-cols-2">
                            <div>
                                <label for="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your name </label>
                                <input type="text" id="name" name='name' value={formik.values.name} onChange={formik.handleChange("name")} onBlur={formik.handleChange("name")} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" />
                                <div className="text-sm text-red-500 pt-2 italic">
                                    {formik.touched.name && formik.errors.name ? (
                                    <div>{formik.errors.name}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <label for="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your email* </label>
                                <input type="email" id="email" name='email' value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleChange("email")} class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@flowbite.com" />
                                <div className="text-sm text-red-500 pt-2 italic">
                                    {formik.touched.country && formik.errors.country ? (
                                    <div>{formik.errors.country}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <label for="country" className="block text-sm font-medium text-gray-900 dark:text-white"> Country* </label>
                                </div>
                                <select id="country" name='country' value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleChange("country")} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                    <option selected disabled value="">Select country</option>
                                    <option value="United States">United States</option>
                                    <option value="Australia">Australia</option>
                                    <option value="France">France</option>
                                    <option value="Spain">Spain</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Vietnam">Vietnam</option>
                                </select>
                                <div className="text-sm text-red-500 pt-2 italic">
                                    {formik.touched.country && formik.errors.country ? (
                                    <div>{formik.errors.country}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <label for="city" className="block text-sm font-medium text-gray-900 dark:text-white"> City* </label>
                                </div>
                                <select id="city" name="city" value={formik.values.city} onChange={formik.handleChange("city")} onBlur={formik.handleChange("city")} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                    <option selected disabled value="">Select city</option>
                                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                                    <option value="Ha Noi">Ha Noi</option>
                                    <option value="Hai Phong">Hai Phong</option>
                                    <option value="Da Nang">Da Nang</option>
                                </select>
                                <div className="text-sm text-red-500 pt-2 italic">
                                    {formik.touched.city && formik.errors.city ? (
                                    <div>{formik.errors.city}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <label for="your_address" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your address*</label>
                                <input type="text" id="your_address" name="address" value={formik.values.address} onChange={formik.handleChange("address")} onBlur={formik.handleChange("address")} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="123 walk street" />
                                <div className="text-sm text-red-500 pt-2 italic">
                                    {formik.touched.address && formik.errors.address ? (
                                    <div>{formik.errors.address}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <label for="phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>

                                <input type="tel" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange("phone")} onBlur={formik.handleChange("phone")} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="12345678" />

                                <div className="text-sm text-red-500 pt-2 italic">
                                    {formik.touched.phone && formik.errors.phone ? (
                                    <div>{formik.errors.phone}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <button type='submit' class="w-full mb-3 text-center rounded-2xl text-sm mx-auto px-3 py-1 mt-2 md:rounded-3xl text-white bg-cyan-950 lg:px-8 lg:py-3 lg:text-lg hover:bg-orange-500 hover:text-black lg:ml-2 lg:mt-5">Proceed to payment</button>
                    </form>
                </div>

                <div className="grid sm:px-10 lg:px-14 xl:px-30">
                    <Link to="/cart" className='text-lg my-5 text-gray-600 flex items-center gap-2 px-4'>
                        <IoArrowBackCircleOutline /> Go back to cart
                    </Link>
                    <p className="px-4 mt-2 text-lg font-medium">Contact information</p>
                    <p className="px-4 mb-3 text-gray-400">(doquangthang.zet@gmail.com)</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout