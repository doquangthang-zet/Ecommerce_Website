import React from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import BlogCard from '../components/BlogCard';

const Blog = () => {
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
                            <div className="col-span-6">
                                <BlogCard />
                            </div>
                            
                            <div className="col-span-6">
                                <BlogCard />
                            </div>
                            <div className="col-span-6">
                                <BlogCard />
                            </div>
                            <div className="col-span-6">
                                <BlogCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Blog