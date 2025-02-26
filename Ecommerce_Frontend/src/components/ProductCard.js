import React from 'react'
import {NavLink, Link, useLocation, useNavigate} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LiaRandomSolid } from "react-icons/lia";
import { BsEye } from 'react-icons/bs';
import watch from "../images/watch.jpg";
import camera from "../images/camera.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { addWishlist } from '../features/product/productSlice';
import { useEffect } from 'react';
import { getWishlist } from '../features/user/userSlice';

const ProductCard = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {grid, data} = props;
    // console.log(grid);
    let location = useLocation();
    const wishlistState = useSelector(state => state?.user?.wishlist?.wishlist);

    useEffect(() => {
        dispatch(getWishlist());
    }, []);

    const addToWishlist = (id) => {
        dispatch(addWishlist(id));
        setTimeout(() => {
            dispatch(getWishlist());
        }, 300);
    };

    // const addToCompare = (id) => {
    //     dispatch(addWishlist(id));
    // };

    return (
        <div className="grid grid-cols-12 col-span-12 gap-4 lg:gap-5">
            {
                data?.map((item, index) => (
                    <div key={index} className={`col-span-${grid}`}>
                        <div className={`${grid === 12 ? "flex gap-5": grid === 6 ? "" : grid === 4 ? "" : grid === 3 ? "" : ""} bg-white rounded-md p-4 relative overflow-hidden group w-full`}>
                            <div className="absolute top-2 right-2 md:top-5 md:right-4">
                                <button onClick={() => addToWishlist(item?._id)}><CiHeart className={wishlistState && wishlistState?.filter((wl) => wl?._id === item?._id)?.length > 0 ? 'w-5 h-5 fill-pink-600' : 'w-5 h-5'} /></button>
                            </div>
            
                            <div className='flex justify-center flex-col'>
                                <img src={item?.images[0]?.url} className={`${grid === 12 ? `w-72 h-56`: grid === 6 ? "mx-auto w-56 h-36" : grid === 4 ? "mx-auto w-44 h-30" : grid === 3 ? "mx-auto w-48 h-24" : "mx-auto w-3/4 h-1/2"} rounded-t-lg block group-hover:hidden object-contain`} alt="product img" />
                                <img src={item?.images[1]?.url} className={`${grid === 12 ? `w-72 h-56`: grid === 6 ? "mx-auto w-56 h-36" : grid === 4 ? "mx-auto w-44 h-30" : grid === 3 ? "mx-auto w-48 h-24" : "mx-auto w-3/4 h-1/2"} rounded-t-lg hidden group-hover:block object-contain`} alt="product img" />
                            </div>
            
                            <div className="p-2">
                                <h6 className='text-sm text-orange-900 font-medium'>{item?.brand}</h6>
                                <h5 className='text-base text-cyan-950 font-semibold'>{item?.title?.length > 15 ? item?.title?.substr(0,15) + "..." : item?.title}</h5>
                                <p className='text-base'>${item?.price}</p>
                                <ReactStars
                                    count={5}
                                    value={item?.totalRating}
                                    edit={false}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                                <p className={`${grid === 12 ? `block` : "hidden"} text-sm text-gray-500 mr-5`} dangerouslySetInnerHTML={{__html: item?.description}}></p>
                            </div>
            
                            <div className="absolute top-8 -right-7 md:top-12 md:-right-5 transition ease-in-out delay-150 group-hover:-translate-x-9 duration-300">
                                <div className="flex flex-col gap-4">
                                    {/* <button>
                                        <HiOutlineShoppingBag className='w-5 h-5' />
                                    </button>
            
                                    <button>
                                        <LiaRandomSolid className='w-5 h-5' />
                                    </button> */}
            
                                    <button onClick={() => navigate("/product/"+item?._id)}>
                                        <BsEye className='w-5 h-5'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductCard