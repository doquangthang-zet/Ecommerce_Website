import React from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {Link} from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import blog from "../images/blog-1.jpg";


const SingleBlog = () => {
  return (
    <>
        <Meta title="Dynamic Blog Name" />
        <BreadCrum title="Dynamic Blog Name" />

        <div className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12">
                    {/* Blog card*/}
                    <div className="col-span-12">
                        <Link to="/blog" className='text-base mb-5 text-gray-600 flex items-center gap-2'>
                            <IoArrowBackCircleOutline /> Go back to blog
                        </Link>
                        <h5 className='text-2xl font-semibold my-5 text-center'>A Good day for programming</h5>

                        <img src={blog} className='rounded-md w-full' alt="blog" />

                        <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, magni. Est natus modi consequatur maiores eius quam necessitatibus cum mollitia numquam. Doloremque corporis quisquam exercitationem, aspernatur reprehenderit repellendus nulla eum!</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SingleBlog