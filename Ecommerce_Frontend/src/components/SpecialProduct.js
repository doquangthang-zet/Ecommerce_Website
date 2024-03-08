import React from 'react'
import {NavLink, Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const SpecialProduct = () => {
  return (
    <div className='col-span-4'>
        <Link className="bg-white rounded-md p-3">
            <div className="flex justify-between">
                <div>
                    <img src="images/watch.jpg" alt="watch" />
                </div>

                <div className="">
                    <h5 className='text-lg text-cyan-950 font-semibold'>Havels</h5>
                    <h6 className='text-base text-orange-900 font-medium'>Samsung Galaxy note 10++</h6>
                    <ReactStars
                        count={5}
                        value={4}
                        edit={false}
                        size={24}
                        activeColor="#ffd700"
                    />
                    <p className='my-1'>
                        <span className='text-red-700'>$100</span> &nbsp; <strike>$200</strike>
                    </p>
                    <div className="flex items-center gap-2 my-3">
                        <p className='mb-0'><b>5</b> days</p>
                        <div className="flex gap-1 items-center">
                            <span className='rounded-full px-3 py-1 text-center text-sm text-black bg-red-500'>1</span>:
                            <span className='rounded-full px-3 py-1 text-center text-sm text-black bg-red-500'>1</span>:
                            <span className='rounded-full px-3 py-1 text-center text-sm text-black bg-red-500'>1</span>
                        </div>
                    </div>
                    <div>
                        <p>Products: 5</p>
                        <div className='w-full my-1 mx-auto'>
                            <progress value="25" max="100" className='w-full rounded-lg h-1'></progress>
                        </div>
                    </div>
                    <Link className='rounded-3xl text-white bg-cyan-950 px-7 py-2 text-lg hover:bg-orange-500 hover:text-black ml-2 mt-2'>Add to cart</Link>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default SpecialProduct