import React, { useEffect, useState } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import BlogCard from '../components/BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlog } from '../features/blog/blogSlice';
import moment from "moment";
import { getAllBlogCate } from '../features/blogCate/blogCateSlice';

const Blog = () => {
  const dispatch = useDispatch();

  const blogState = useSelector(state => state?.blog?.blogs);
  const blogCateState = useSelector(state => state?.blogCate?.blogCates);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();

  useEffect(() => {
    dispatch(getAllBlog());
    dispatch(getAllBlogCate());
  }, []);

  useEffect(() => {
      let categories = [];
      for (let index = 0; index < blogState.length; index++) {
        categories.push(blogState[index]?.category);
      }
  
      setCategories(categories);
    }, [blogState]);
  // console.log({sort, tags: selectedTag, brand, category, minPrice, maxPrice});
  
    useEffect(() => {
      getBlogs();
    }, [category]);
  
    const getBlogs = () => {
      dispatch(getAllBlog(category));
    };

  return (
    <>
        <Meta title="Blog" />
        <BreadCrum title="Blog" />

        <div className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    {/* Filter left */}
                    <div className="col-span-3 hidden lg:block">
                        <div className="bg-white rounded-md px-4 py-3 mb-3">
                            <h3 className='text-base font-semibold mb-5'>Find By Categories</h3>

                            <div>
                                <ul className='text-sm list-none cursor-pointer flex gap-2 flex-wrap'>
                                    {
                                        categories && [...new Set(categories)]?.map((item, index) => (
                                        <li onClick={() => setCategory(item)} key={index} className='hover:font-medium'>{item}</li>
                                        ))
                                    }
                                    {/* {
                                        blogCateState && blogCateState?.map((item, index) => (
                                        <li key={index}>{item?.title}</li>
                                        ))
                                    } */}
                                </ul>
                            </div>
                        </div>

                        <div 
                            className='rounded-md text-white text-center bg-cyan-600 p-1 my-2 text-md hover:bg-cyan-700 w-fit cursor-pointer' 
                            onClick={() => {
                                setCategory();
                            }}
                        >
                            Clear Filter
                        </div>
                    </div>

                    {/* Blog part right */}
                    <div className="col-span-12 lg:col-span-9">
                        <div className="grid grid-cols-12 gap-2">
                            {
                                blogState && blogState?.map((item, index) => (
                                    <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4">
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