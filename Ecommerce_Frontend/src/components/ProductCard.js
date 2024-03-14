import React from 'react'
import {NavLink, Link, useLocation} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LiaRandomSolid } from "react-icons/lia";
import { BsEye } from 'react-icons/bs';
import watch from "../images/watch.jpg";
import camera from "../images/camera.jpg";

const ProductCard = (props) => {
    const {grid} = props;
    let location = useLocation();

    return (
        <div className={`${location.pathname == "/store" ? `col-span-${grid}` : `col-span-3`}`}>
            <Link className={`${grid == 12 ? "flex gap-5": grid == 6 ? "" : grid == 4 ? "" : ""} bg-white rounded-md p-4 relative overflow-hidden group w-full`}>
                <div className="absolute top-5 right-4">
                    <Link><CiHeart className='w-5 h-5' /></Link>
                </div>

                <div className='flex justify-center flex-col'>
                    <img src={watch} className={`${grid == 12 ? `w-72`: grid == 6 ? "mx-auto w-3/4 h-1/2" : grid == 4 ? "mx-auto w-3/4 h-1/2" : "mx-auto w-3/4 h-1/2"} rounded-t-lg block group-hover:hidden object-contain`} alt="product img" />
                    <img src={camera} className={`${grid == 12 ? `w-72`: grid == 6 ? "mx-auto w-3/4 h-1/2" : grid == 4 ? "mx-auto w-3/4 h-1/2" : "mx-auto w-3/4 h-1/2"} rounded-t-lg hidden group-hover:block object-contain`} alt="product img" />
                </div>

                <div className="p-4">
                    <h6 className='text-sm text-orange-900 font-medium'>Havels</h6>
                    <h5 className='text-base text-cyan-950 font-semibold'>Kids headphone bilk 10 pack lsfaskdfhaksdfasdjbvj.</h5>
                    <p className='text-base'>$100</p>
                    <ReactStars
                        count={5}
                        value={4}
                        edit={false}
                        size={24}
                        activeColor="#ffd700"
                    />
                    <p className={`${grid == 12 ? `block` : "hidden"} text-sm text-gray-500 mr-5`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut quam reiciendis inventore dignissimos minus veniam eveniet velit excepturi nihil tempora dolores neque necessitatibus optio, reprehenderit, atque quasi ducimus modi ipsa!</p>
                </div>

                <div className="absolute top-14 -right-5 transition ease-in-out delay-150 group-hover:-translate-x-9 duration-300">
                    <div className="flex flex-col gap-4">
                        <Link>
                            <HiOutlineShoppingBag className='w-5 h-5' />
                        </Link>

                        <Link>
                            <LiaRandomSolid className='w-5 h-5' />
                        </Link>

                        <Link>
                            <BsEye className='w-5 h-5' />
                        </Link>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard