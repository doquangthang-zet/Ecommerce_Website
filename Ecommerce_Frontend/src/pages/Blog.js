import React, { useEffect } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import BlogCard from '../components/BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlog } from '../features/blog/blogSlice';
import moment from "moment";

const Blog = () => {
  const dispatch = useDispatch();

  const blogState = useSelector(state => state?.blog?.blogs);

  useEffect(() => {
    dispatch(getAllBlog());
  }, []);

  return (
    <>
        <Meta title="Blog" />
        <BreadCrum title="Blog" />

        <div className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    {/* Filter left */}
                    <div className="col-span-3">
                        <div className="bg-white rounded-md px-4 py-3 mb-3">
                            <h3 className='text-base font-semibold mb-5'>Find By Categories</h3>

                            <div>
                                <ul className='text-sm list-none cursor-pointer'>
                                <li>Watch</li>
                                <li>TV</li>
                                <li>Laptops</li>
                                <li>Camera</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Blog part right */}
                    <div className="col-span-9">
                        <div className="pb-5 grid grid-cols-12 gap-4">
                            {
                                blogState && blogState?.map((item, index) => (
                                    <div key={index} className="col-span-6">
                                        <BlogCard
                                            id={item?._id}
                                            title={item?.title}
                                            description={item?.description}
                                            image={item?.images[0]?.url} 
                                            date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm a')}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Blog