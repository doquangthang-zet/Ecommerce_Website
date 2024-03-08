import React from 'react'
import {NavLink, Link, useLocation} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = (props) => {
    const {grid} = props;
    let location = useLocation();

    return (
        <div className={`${location.pathname == "/store" ? `col-span-${grid}` : `col-span-3`}`}>
            <Link className={`${grid == 12 ? "flex gap-5": grid == 6 ? "" : grid == 4 ? "" : ""} bg-white rounded-md p-4 relative overflow-hidden group w-full`}>
                <div className="absolute top-5 right-4">
                    <Link><img src="images/wish.svg" alt="wishlist" /></Link>
                </div>

                <div className='flex justify-center flex-col'>
                    <img src="images/watch.jpg" className={`${grid == 12 ? `w-72`: grid == 6 ? "mx-auto w-3/4 h-1/2" : grid == 4 ? "mx-auto w-3/4 h-1/2" : "mx-auto w-3/4 h-1/2"} rounded-t-lg block group-hover:hidden object-contain`} alt="product img" />
                    <img src="images/camera.jpg" className={`${grid == 12 ? `w-72`: grid == 6 ? "mx-auto w-3/4 h-1/2" : grid == 4 ? "mx-auto w-3/4 h-1/2" : "mx-auto w-3/4 h-1/2"} rounded-t-lg hidden group-hover:block object-contain`} alt="product img" />
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