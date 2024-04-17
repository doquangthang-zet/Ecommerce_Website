import React, { useEffect } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {Link, useParams} from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import blog from "../images/blog-1.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { getOneBlog } from '../features/blog/blogSlice';
import moment from "moment";

const SingleBlog = () => {
    const dispatch = useDispatch();
    const param = useParams();
    const blogId = param.id;

    const currentBlogState = useSelector(state => state?.blog?.currentBlog);
  
    useEffect(() => {
      dispatch(getOneBlog(blogId));
    }, []);

  return (
    <>
        <Meta title={currentBlogState?.title} />
        <BreadCrum title={currentBlogState?.title} />

        <div className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12">
                    {/* Blog card*/}
                    <div className="col-span-12">
                        <Link to="/blog" className='text-base mb-5 text-gray-600 flex items-center gap-2'>
                            <IoArrowBackCircleOutline /> Go back to blog
                        </Link>
                        <h5 className='text-2xl font-semibold my-5 text-center'>{currentBlogState?.title}</h5>

                        <img src={currentBlogState?.images[0]?.url ? currentBlogState?.images[0]?.url : blog} className='rounded-md w-full' alt="blog" />

                        <p className='my-2' dangerouslySetInnerHTML={{__html: currentBlogState?.description}}></p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SingleBlog