import React from 'react'
import {NavLink, Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import watch from "../images/watch.jpg";

const SpecialProduct = (props) => {
    const {id, brand, title, totalRating, price, quantity, sold, image} = props;

  return (
    <div className='col-span-12 sm:col-span-6 md:col-span-4'>
        <div className="bg-white rounded-md p-2 sm:p-3 md:p-4">
            <div className="flex flex-col justify-center gap-1">
                <div className='w-30 h-25 sm:w-60 sm:h-44 md:w-44 md:h-36 lg:w-full lg:h-60'>
                    <img className='w-full h-full' src={image} alt="watch" />
                </div>

                <div className="text-center flex flex-col justify-center items-center gap-0 sm:gap-1 md:gap-2">
                    <h5 className='text-base font-medium md:text-lg text-cyan-950 md:font-semibold'>{brand}</h5>
                    <h6 className='text-sm font-normal md:text-base text-orange-900 md:font-medium'>{title.length > 33 ? title.slice(0, 33) : title}</h6>
                    <ReactStars
                        count={5}
                        value={totalRating}
                        edit={false}
                        size={24}
                        activeColor="#ffd700"
                    />
                    <p className='my-1'>
                        <span className='text-red-700'>${price}</span> &nbsp; <strike>${price + 300}</strike>
                    </p>
                    <div className="flex items-center gap-1 my-1 sm:gap-2">
                        <p className='mb-0'><b>2</b> days</p>
                        <div className="flex gap-0 items-center sm:gap-2">
                            <span className='rounded-full px-2 py-1 text-center text-sm text-black bg-red-500'>24</span>:
                            <span className='rounded-full px-2 py-1 text-center text-sm text-black bg-red-500'>30</span>:
                            <span className='rounded-full px-2 py-1 text-center text-sm text-black bg-red-500'>10</span>
                        </div>
                    </div>
                    <div className='w-full'>
                        <p>Products: {quantity}</p>
                        <div className='w-2/3 my-1 mx-auto'>
                            <progress value={quantity / (quantity + sold) * 100} aria-valuemax={quantity+sold} aria-valuemin={quantity} className='w-full rounded-lg h-1'></progress>
                        </div>
                    </div>
                    <Link to={'/product/'+id} className='rounded-3xl text-white bg-cyan-950 p-1 px-5 lg:px-7 lg:py-2 text-sm hover:bg-orange-500 hover:text-black'>View</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SpecialProduct