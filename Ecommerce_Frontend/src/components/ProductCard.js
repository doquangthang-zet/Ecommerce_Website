import React from 'react'
import {NavLink, Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = () => {
    return (
        <div className='col-span-3'>
            <Link className="bg-white rounded-md p-4 relative overflow-hidden group">
                <div className="absolute top-5 right-4">
                    <Link><img src="images/wish.svg" alt="wishlist" /></Link>
                </div>

                <div className='flex justify-center flex-col'>
                    <img src="images/watch.jpg" className='rounded-t-lg block group-hover:hidden object-contain' alt="product img" />
                    <img src="images/camera.jpg" className='rounded-t-lg hidden group-hover:block object-contain' alt="product img" />
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
                </div>

                <div className="absolute top-14 -right-5 transition ease-in-out delay-150 group-hover:-translate-x-9 duration-300">
                    <div className="flex flex-col gap-4">
                        <Link>
                            <img src="images/add-cart.svg" alt="add cart" />
                        </Link>

                        <Link>
                            <img src="images/prodcompare.svg" alt="product compare" />
                        </Link>

                        <Link>
                            <img src="images/view.svg" alt="viewt" />
                        </Link>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard