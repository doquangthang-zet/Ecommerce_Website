import React from 'react'
import {NavLink, Link} from "react-router-dom";
import blog from "../images/blog-1.jpg";

const BlogCard = (props) => {
  const {id, title, description, image, date} = props;

  return (
    <div className=''>
        <div className="bg-white rounded-md">
            <img src={image?image:blog} className='rounded-t-md w-full' alt="blog" />

            <div className="p-4">
                <p className='text-sm uppercase leading-none font-normal p-0 text-gray-500'>{date}</p>
                <h5 className='text-lg font-medium'>{title}</h5>
                <p className='text-base' dangerouslySetInnerHTML={{__html: description?.length > 70 ? description?.substr(0,70) + "..." : description}}></p>
                <Link to={`/blog/${id}`} className='rounded-3xl text-white bg-cyan-950 px-8 py-3 text-lg hover:bg-orange-500 hover:text-black ml-2 mt-5'>Read more</Link>
            </div>
        </div>
    </div>
  )
}

export default BlogCard