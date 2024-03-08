import React from 'react'
import {NavLink, Link} from "react-router-dom";

const BlogCard = () => {
  return (
    <div className='col-span-3'>
        <div className="bg-white rounded-md">
            <img src="images/blog-1.jpg" className='rounded-t-md' alt="blog" />

            <div className="p-4">
                <p className='text-sm uppercase leading-none font-normal p-0 text-gray-500'>6 Mar, 2024</p>
                <h5 className='text-lg font-medium'>A Good day for programming</h5>
                <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptates similique dolorem amet molestias provident voluptatibus inventore ducimus maxime debitis asperiores adipisci ratione, laudantium magnam natus, excepturi veniam! Ut, nesciunt.</p>
                <Link to="" className='rounded-3xl text-white bg-cyan-950 px-8 py-3 text-lg hover:bg-orange-500 hover:text-black ml-2 mt-5'>Read more</Link>
            </div>
        </div>
    </div>
  )
}

export default BlogCard