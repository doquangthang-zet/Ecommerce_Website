import React, { useEffect, useState } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {Link, useNavigate, useParams} from "react-router-dom";
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import Color from '../components/Color';
import { FaCodeCompare, FaRegHeart } from "react-icons/fa6";
import { LiaLinkSolid, LiaShippingFastSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import { addWishlist, getOneProduct, writeRating } from '../features/product/productSlice';
import { toast } from 'react-toastify';
import { addToCart, getUserCart, getWishlist } from '../features/user/userSlice';
import { CiHeart } from 'react-icons/ci';

const SingleProduct = () => {
    const [orderedProduct, setOrderedProduct] = useState(false);

    const dispatch = useDispatch();
    const param = useParams();
    const prodId = param.id;
    const navigate = useNavigate();

    const currentProdState = useSelector(state => state?.product?.currentProduct);
    const userCartState = useSelector(state => state?.user?.userCart);
    const productState = useSelector(state => state?.product?.products);

    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    const [star, setStar] = useState(null);
    const [comment, setComment] = useState("");

    const [grid, setGrid] = useState(3);
    const wishlistState = useSelector(state => state?.user?.wishlist?.wishlist);

  
    useEffect(() => {
      dispatch(getOneProduct(prodId));
      dispatch(getUserCart());
    }, []);

    useEffect(() => {
        for(let i = 0; i < userCartState?.length; i++) {
            if(currentProdState?._id === userCartState[i]?.productId?._id) {
                setAlreadyAdded(true);
            }
        }
    }, []);

    const uploadCart = () => {
        if(color === null) {
            toast.error("Please choose color!")
            return false;
        } else {
            dispatch(addToCart({prodId: currentProdState?._id, quantity: quantity, color: color, price: currentProdState?.price}));
            navigate("/cart")
        }
    }

    const addRating = () => {
        if(comment === null) {
            toast.error("Please add a comment!")
            return false;
        } else if (star === null) {
            toast.error("Please choose a star!")
            return false;
        } else {
            dispatch(writeRating({prodId: prodId, star: star, comment: comment}));
            setTimeout(() => {
                dispatch(getOneProduct(prodId));
            }, 300);
            
        }
        return false;
    }
    
    const addToWishlist = (id) => {
        dispatch(addWishlist(id));
        setTimeout(() => {
            dispatch(getWishlist());
        }, 300);
    };

    useEffect(() => {
        const updateItems = () => {
            if (window.innerWidth < 640) {
            setGrid(12); // Mobile: Show 1 items
            } else if (window.innerWidth < 1024) {
            setGrid(6); // Tablet: Show 2 items
            } else {
            setGrid(3); // Desktop: Show 4 items
            }
        };

        updateItems(); // Run on mount
        window.addEventListener("resize", updateItems);

        return () => window.removeEventListener("resize", updateItems);
    }, []);

  return (
    <>
        <Meta title={currentProdState?.title} />
        <BreadCrum title={currentProdState?.title} />

        {/* Product infor section */}
        <section className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 bg-white p-3 rounded-md">
                    {/* Product card*/}
                    <div className="col-span-12 md:col-span-6">
                        <div className="p-3">
                            <div className="border border-gray-500 mb-5">
                                <img className='w-full md:h-100' src={currentProdState?.images[0].url} alt="image" />
                            </div>

                            <div className="sm:flex flex-wrap gap-4 hidden">
                                {
                                    currentProdState?.images.map((item, index) => (
                                        <div key={index} className="border border-gray-500 p-5 w-48%">
                                            <img className='' src={item?.url} alt="image" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <div className="p-5">
                            <div className="border-b border-gray-300">
                                <h3 className='text-xl font-semibold mb-3 text-center md:text-left'>{currentProdState?.title}</h3>
                            </div>
                            <div className="border-b border-gray-300">
                                <p className='text-base font-semibold my-3 text-center md:text-left'>$ {currentProdState?.price}</p>
                                <div className="flex flex-col md:flex-row items-center gap-3">
                                    <ReactStars
                                        count={5}
                                        value={currentProdState?.totalRating}
                                        edit={false}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                    <p className='mb-0 text-sm text-gray-500'>( {currentProdState?.ratings?.length} reviews )</p>
                                </div>
                                <a href="#review" className='text-sm text-gray-500 mb-3 w-full text-center md:text-left'>Write a review</a>
                            </div>
                            <div className='border-b border-gray-300 py-3'>
                                <div className="flex gap-3 items-center my-2">
                                    <h3 className='text-base mb-0 font-medium'>Brand: </h3> <p className='text-sm text-gray-700 mb-0'>{currentProdState?.brand}</p>
                                </div>
                                <div className="flex gap-3 items-center my-2">
                                    <h3 className='text-base mb-0 font-medium'>Category: </h3> <p className='text-sm text-gray-700 mb-0'>{currentProdState?.category}</p>
                                </div>
                                <div className="flex gap-3 items-center my-2">
                                    <h3 className='text-base mb-0 font-medium'>Tags: </h3> <p className='text-sm text-gray-700 mb-0'>{currentProdState?.tags}</p>
                                </div>
                                <div className="flex gap-3 items-center my-2">
                                    <h3 className='text-base mb-0 font-medium'>Availability: </h3> <p className='text-sm text-gray-700 mb-0'>{currentProdState?.quantity > 0 ? "In Stock" : "Unavailable"}</p>
                                </div>
                                {/* <div className="flex gap-3 items-start my-3 flex-col">
                                    <h3 className='text-base mb-0 font-medium'>Size: </h3>
                                    <div className="flex flex-wrap gap-3">
                                        <span className='border-gray-800 px-3 border rounded'>S</span>
                                        <span className='border-gray-800 px-3 border rounded'>M</span>
                                        <span className='border-gray-800 px-3 border rounded'>L</span>
                                        <span className='border-gray-800 px-3 border rounded'>XL</span>
                                    </div>
                                </div> */}
                                {
                                    alreadyAdded === false && 
                                    <div className="flex gap-3 items-start my-3 flex-col">
                                        <h3 className='text-base mb-0 font-medium'>Color: </h3>
                                        <Color colorData={currentProdState?.color} setColor={setColor} />
                                    </div>
                                }
                                
                                <div className="flex gap-3 flex-col md:flex-row items-center my-4">
                                    {
                                        alreadyAdded === false && 
                                        <>
                                            <h3 className='text-base mb-0 font-medium'>Quantity: </h3>
                                            <div>
                                                <input onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" name="quantity" id="quantity" className="flex-1 text-center border border-gray-800 rounded-md py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" min={1} max={currentProdState?.quantity} />
                                            </div>
                                        </>
                                    }
                                    
                                    <div className="flex justify-center items-center w-full gap-4 md:ms-5">
                                        <button onClick={() => alreadyAdded ? navigate("/cart") : uploadCart(currentProdState?._id)} type='submit' className='w-2/3 rounded-2xl text-sm ml-1 px-3 py-1 mt-2 md:rounded-3xl text-white bg-cyan-950 lg:px-8 lg:py-3 lg:text-lg hover:bg-orange-500 hover:text-black lg:ml-2 lg:mt-5'>{alreadyAdded === false ? "Add to cart" : "Go to cart"}</button>
                                        {/* <button to="/signup" className='rounded-3xl text-black bg-orange-500 px-8 py-2 text-lg hover:bg-cyan-950 hover:text-white ml-2'>Buy now</button> */}
                                    </div>
                                </div>
                                <div className="flex gap-9 items-center my-2">
                                    {/* <div>
                                        <a href="" className='text-base text-gray-500 flex items-center gap-2 my-2'>
                                            <FaCodeCompare /> Add to compare
                                        </a>
                                    </div> */}

                                    <div>
                                        <a href="#" onClick={() => addToWishlist(prodId)} className='text-base text-nowrap text-gray-500 flex items-center gap-2 my-2'>
                                            <CiHeart className={wishlistState && wishlistState?.filter((wl) => wl?._id === prodId)?.length > 0 ? 'w-5 h-5 fill-pink-600' : 'w-5 h-5'} />
                                            Add/remove wishlist
                                        </a>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start flex-col my-2">
                                    <h3 className='text-base mb-0 font-medium flex items-center gap-2'><LiaShippingFastSolid /> Shipping & return: </h3> <p className='text-sm text-gray-700 mb-0'>Free shipping and returns available on all orders! <br />
                                    We ship all domestic orders within <b>5-10 business days!</b></p>
                                </div>
                                <div className="flex gap-3 items-center my-2">
                                    <h3 className='text-base mb-0 font-medium flex items-center gap-2'><LiaLinkSolid /> Product Link: </h3>
                                    <div className='text-base text-gray-500 flex items-center gap-2 my-2 cursor-pointer' onClick={() => {toast.info("Link is copied!"); return navigator.clipboard.writeText(window.location.href)}}>
                                        Copy link product.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Description section */}
        <section className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-2 lg:gap-5">
                    {/* Product card*/}
                    <div className="col-span-12 text-center md:text-left">
                        <h3 className='text-lg font-medium mb-3 md:text-xl lg:text-2xl lg:mb-5'>Description</h3>
                    </div>
                    <div className="col-span-12">
                        <div className='bg-white p-3 rounded-md'>
                            <p dangerouslySetInnerHTML={{__html: currentProdState?.description}}></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Review section */}
        <section className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-12">
                    {/* Reviews card*/}
                    <div className="col-span-12">

                        <div className="col-span-12 text-center md:text-left">
                            <h3 className='text-lg font-medium mb-3 md:text-xl lg:text-2xl lg:mb-5' id='review'>Reviews</h3>
                        </div>

                        <div className='bg-white p-3 md:p-8 rounded-md'>
                            {/* Review Heading */}
                            <div className="flex justify-between items-end border-b border-gray-300 pb-5">
                                <div className='w-full'>
                                    <h4 className='text-base font-normal mb-3 hidden md:block md:text-lg lg:text-xl lg:mb-5'>Customer Reviews</h4>
                                    <div className="flex flex-col md:flex-row items-center gap-3">
                                        <ReactStars
                                            count={5}
                                            value={currentProdState && currentProdState.totalRating}
                                            edit={false}
                                            size={24}
                                            activeColor="#ffd700"
                                        />
                                        <p className='mb-0'>Based on {currentProdState?.ratings?.length} reviews</p>
                                    </div>
                                    
                                </div>

                                {orderedProduct && 
                                    <div className='text-center'>
                                        <a href="#review">Write a review</a>
                                    </div>
                                }
                            </div>

                            {/* Review Form */}
                            <div className='py-4 border-b border-gray-300 mb-3 text-center md:text-left'>
                                <h4 className='text-base font-medium'>Write a review</h4>
                                <div className='flex flex-col gap-3'>
                                    <div className="grid grid-cols-1 gap-x-6">
                                        <div className="flex flex-col md:items-start justify-center items-center gap-3">
                                            <ReactStars
                                                count={5}
                                                edit={true}
                                                size={24}
                                                activeColor="#ffd700"
                                                onChange={(newRating) => setStar(newRating)}
                                                value={star}
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <div className="mt-2">
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                cols={30}
                                                rows={4}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 bg-gray-200"
                                                placeholder='Comment'
                                            />
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your comment.</p>
                                        </div>

                                        <div className="mt-3 col-span-full flex justify-center md:justify-end">
                                            <button
                                                type="button"
                                                onClick={() => addRating()}
                                                className="w-2/3 rounded-2xl text-sm ml-1 px-3 py-1 mt-2 md:w-1/3 md:rounded-3xl text-white bg-cyan-950 lg:px-8 lg:py-3 lg:text-lg hover:bg-orange-500 hover:text-black lg:ml-2 lg:mt-5"
                                            >
                                                Submit Review
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews from other */}
                            <div>
                                {
                                    currentProdState && currentProdState?.ratings?.map((item, index) => (
                                        <div key={index} className='border-b border-gray-300 pb-4'>
                                            <div className="flex gap-3 items-center">
                                                <h6 className='text-xl font-medium'>{item.postedBy.firstname}</h6>
                                                <ReactStars
                                                    count={5}
                                                    value={item.star}
                                                    edit={false}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                />
                                            </div>
                                            <p className='text-base mt-3'>{item.comment}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>

        {/* Popular products section */}
        <section className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-2 lg:gap-5">
                    <div className="col-span-12 text-center md:text-left">
                        <h3 className='text-lg font-medium mb-3 md:text-xl lg:text-2xl lg:mb-5'>Our Popular Products</h3>
                    </div>

                    <ProductCard
                        grid={grid} 
                        data={
                            productState ? productState?.filter((item, index) => {
                                if(item?.tags === "featured") {
                                    return item;
                                }
                            }) : []
                        } 
                    />
                </div>
            </div>
        </section>
    </>
  )
}

export default SingleProduct