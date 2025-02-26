import React from 'react'
import {NavLink, Link} from "react-router-dom";
import blog from "../images/blog-1.jpg";

const BlogCard = (props) => {
  const {id, title, description, image, date} = props;

  return (
    <div className='p-1 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg'>
        <div className="bg-white rounded-md p-2 md:h-96 lg:h-100">
            <img src={image?image:blog} className='rounded-t-md w-full h-1/2 sm:h-2/3 md:h-56' alt="blog" />

            <div className="p-1 flex flex-col items-center md:h-36 md:justify-between lg:h-52 lg:justify-between lg:items-center">
                <p className='text-xs lg:text-sm uppercase leading-none font-normal p-0 text-gray-500 mb-1'>{date}</p>
                <h5 className='text-lg font-normal text-center mb-1 md:font-medium lg:text-start'>{title}</h5>
                <p className='text-base hidden' dangerouslySetInnerHTML={{__html: description?.length > 70 ? description?.substr(0,70) + "..." : description}}></p>
                <Link to={`/blog/${id}`} className='rounded-3xl text-white bg-cyan-950 px-3 py-1 text-base hover:bg-orange-500 hover:text-black'>Read more</Link>
            </div>
        </div>
    </div>
  )
}

export default BlogCard