import React from 'react'
import {NavLink, Link, useLocation} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LiaRandomSolid } from "react-icons/lia";
import { BsEye } from 'react-icons/bs';
import watch from "../images/watch.jpg";
import camera from "../images/camera.jpg";
import { useDispatch } from 'react-redux';
import { addWishlist } from '../features/product/productSlice';

const ProductCard = (props) => {
    const dispatch = useDispatch();
    const {grid, data} = props;
    // console.log(data);
    let location = useLocation();

    const addToWishlist = (id) => {
        console.log(id);
        dispatch(addWishlist(id));
    };

    return (
        <>
            {
                data?.map((item, index) => (
                    <div key={index} className={`${location.pathname == "/store" ? `col-span-${grid}` : `col-span-3`}`}>
                        <Link className={`${grid == 12 ? "flex gap-5": grid == 6 ? "" : grid == 4 ? "" : ""} bg-white rounded-md p-4 relative overflow-hidden group w-full`}>
                            <div className="absolute top-5 right-4">
                                <button onClick={() => addToWishlist(item?._id)}><CiHeart className='w-5 h-5' /></button>
                            </div>
            
                            <div className='flex justify-center flex-col'>
                                <img src={item?.images[0]?.url} className={`${grid == 12 ? `w-72`: grid == 6 ? "mx-auto w-3/4 h-1/2" : grid == 4 ? "mx-auto w-3/4 h-1/2" : "mx-auto w-3/4 h-1/2"} rounded-t-lg block group-hover:hidden object-contain`} alt="product img" />
                                <img src={camera} className={`${grid == 12 ? `w-72`: grid == 6 ? "mx-auto w-3/4 h-1/2" : grid == 4 ? "mx-auto w-3/4 h-1/2" : "mx-auto w-3/4 h-1/2"} rounded-t-lg hidden group-hover:block object-contain`} alt="product img" />
                            </div>
            
                            <div className="p-4">
                                <h6 className='text-sm text-orange-900 font-medium'>{item?.brand}</h6>
                                <h5 className='text-base text-cyan-950 font-semibold'>{item?.title}</h5>
                                <p className='text-base'>${item?.price}</p>
                                <ReactStars
                                    count={5}
                                    value={item?.totalRating}
                                    edit={false}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                                <p className={`${grid == 12 ? `block` : "hidden"} text-sm text-gray-500 mr-5`} dangerouslySetInnerHTML={{__html: item?.description}}></p>
                            </div>
            
                            <div className="absolute top-14 -right-5 transition ease-in-out delay-150 group-hover:-translate-x-9 duration-300">
                                <div className="flex flex-col gap-4">
                                    <button>
                                        <HiOutlineShoppingBag className='w-5 h-5' />
                                    </button>
            
                                    <button>
                                        <LiaRandomSolid className='w-5 h-5' />
                                    </button>
            
                                    <button>
                                        <BsEye className='w-5 h-5' />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </>
    )
}

export default ProductCard