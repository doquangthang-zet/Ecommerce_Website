import React, { useEffect, useState } from 'react'
import {NavLink, Link} from "react-router-dom";
import Marquee from "react-fast-marquee";
import Meta from '../components/Meta';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlog } from '../features/blog/blogSlice';
import moment from "moment";
import { getAllProduct } from '../features/product/productSlice';

const Home = () => {
  const dispatch = useDispatch();

  const blogState = useSelector(state => state?.blog?.blogs);
  const productState = useSelector(state => state?.product?.products);

  const [grid, setGrid] = useState(3);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) {
        setGrid(12); // Mobile: Show 1 items
      } else if (window.innerWidth < 1024) {
        setGrid(6); // Tablet: Show 2 items
      } else {
        setGrid(3); // Desktop: Show 4 items
      }
    };

    updateItems(); // Run on mount
    window.addEventListener("resize", updateItems);

    return () => window.removeEventListener("resize", updateItems);
  }, []);

  useEffect(() => {
    dispatch(getAllBlog());
    dispatch(getAllProduct());
  }, []);

  return (
    <div className='bg-gray-200'>
      <Meta title="Home" />

      {/* Banners home section */}
      <section className="p-2 mb-2 md:py-5 md:mb-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 sm:col-span-6">
              <div className="p-2 relative">
                <img src="images/main-banner-1.jpg" className='rounded-md' alt="main Banner" />
                <div className="absolute p-2 top-2 left-1 lg:top-16 lg:left-5 lg:gap-6">
                  <h4 className='text-sm md:text-xl md:tracking-wide text-orange-500 ml-1 md:ml-2 font-normal capitalize md:leading-6'>SUPERCHARGED FOR PROS.</h4>
                  <h5 className='text-xl md:text-5xl md:tracking-tight ml-1 md:font-medium md:ml-2 md:leading-10 md:mt-5'>iPad S13+ Pro.</h5>
                  <p className='text-base ml-1 md:text-xl md:tracking-wide md:leading-6 md:ml-2 md:mt-5'>From $123 or $10/mo.</p>
                  <Link to={"/store"} className='rounded-2xl text-base ml-1 px-2 mt-2 md:rounded-3xl text-white bg-cyan-950 md:px-8 md:py-3 md:text-lg hover:bg-orange-500 hover:text-black md:ml-2 md:mt-5'>BUY NOW</Link>
                </div>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-6 hidden sm:block">
              <div className="flex flex-wrap justify-between items-center">
                <div className="p-3 relative w-full lg:w-1/2">
                  <img src="images/catbanner-01.jpg" className='rounded-md' alt="main Banner" />
                  <div className="absolute top-8 left-5 lg:top-4 lg:left-2 xl:top-10 xl:left-6 p-1 gap-1">
                    <h4 className='text-sm md:text-base tracking-wide text-orange-500 md:ml-2 font-normal uppercase md:leading-5'>Best Sale.</h4>
                    <h5 className='text-lg md:text-xl tracking-tight md:ml-1 font-medium md:leading-9 md:mt-2'>iPad S13+ Pro.</h5>
                    <p className='text-sm md:text-base tracking-wide md:leading-5 md:ml-2 md:mt-2'>From $123 <br /> or $10/mo.</p>
                  </div>
                </div>

                <div className="p-3 relative w-full lg:w-1/2">
                  <img src="images/catbanner-02.jpg" className='rounded-md' alt="main Banner" />
                  <div className="absolute top-8 left-5 lg:top-4 lg:left-2 xl:top-10 xl:left-6 p-1 gap-1">
                    <h4 className='text-sm md:text-base tracking-wide text-orange-500 md:ml-2 font-normal uppercase md:leading-5'>New Arrival.</h4>
                    <h5 className='text-lg md:text-xl tracking-tight md:ml-1 font-medium md:leading-9 md:mt-2'>iPad S13+ Pro.</h5>
                    <p className='text-sm md:text-base tracking-wide md:leading-5 md:ml-2 md:mt-2'>From $123 <br /> or $10/mo.</p>
                  </div>
                </div>

                <div className="p-3 relative w-1/2 hidden lg:block">
                  <img src="images/catbanner-03.jpg" className='rounded-md' alt="main Banner" />
                  <div className="absolute top-8 left-5 lg:top-4 lg:left-2 xl:top-10 xl:left-6 p-1 gap-1">
                    <h4 className='text-sm md:text-base tracking-wide text-orange-500 md:ml-2 font-normal uppercase md:leading-5'>SUPERCHARGED FOR PROS.</h4>
                    <h5 className='text-lg md:text-xl tracking-tight md:ml-1 font-medium md:leading-9 md:mt-2'>iPad S13+ Pro.</h5>
                    <p className='text-sm md:text-base tracking-wide md:leading-5 md:ml-2 md:mt-2'>From $123 <br /> or $10/mo.</p>
                  </div>
                </div>

                <div className="p-3 relative w-1/2 hidden lg:block">
                  <img src="images/catbanner-04.jpg" className='rounded-md' alt="main Banner" />
                  <div className="absolute top-8 left-5 lg:top-4 lg:left-2 xl:top-10 xl:left-6 p-1 gap-1">
                    <h4 className='text-sm md:text-base tracking-wide text-orange-500 md:ml-2 font-normal uppercase md:leading-5'>SUPERCHARGED.</h4>
                    <h5 className='text-lg md:text-xl tracking-tight md:ml-1 font-medium md:leading-9 md:mt-2'>iPad S13+ Pro.</h5>
                    <p className='text-sm md:text-base tracking-wide md:leading-5 md:ml-2 md:mt-2'>From $123 <br /> or $10/mo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sevices home section */}
      <section className="p-2 mb-2 lg:py-5 lg:mb-6 bg-gray-300">
        <div className="container mx-auto">
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="flex justify-between items-center">
                <div className="p-0 flex items-center gap-1 lg:gap-3 lg:p-3">
                  <img src="images/service.png" className='rounded-md' alt="services" />
                  <div className="hidden sm:block">
                    <h6 className='font-medium'>Free Shipping.</h6>
                    <p className=''>From all orders over $5.</p>
                  </div>
                </div>

                <div className="p-3 flex items-center gap-3">
                  <img src="images/service-02.png" className='rounded-md' alt="services" />
                  <div className="hidden sm:block">
                    <h6 className='font-medium'>Daily Suprise Offer.</h6>
                    <p className=''>Save up to $5.</p>
                  </div>
                </div>

                <div className="p-3 flex items-center gap-3">
                  <img src="images/service-03.png" className='rounded-md' alt="services" />
                  <div className="hidden sm:block">
                    <h6 className='font-medium'>Support 24/7.</h6>
                    <p className=''>Shop with an expert.</p>
                  </div>
                </div>

                <div className="p-3 flex items-center gap-3">
                  <img src="images/service-04.png" className='rounded-md' alt="services" />
                  <div className="hidden sm:block">
                    <h6 className='font-medium'>Affordable Price.</h6>
                    <p className=''>Get factory default price.</p>
                  </div>
                </div>

                <div className="p-3 flex items-center gap-3">
                  <img src="images/service-05.png" className='rounded-md' alt="services" />
                  <div className="hidden sm:block">
                    <h6 className='font-medium'>Secure payment.</h6>
                    <p className=''>100% Protected Payment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories home section */}
      <section className="p-2 mb-2 md:py-5 md:mb-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="bg-white shadow-all flex flex-wrap justify-between items-center p-1 md:p-3">
                <div className='flex items-center gap-5 border-b w-full md:border-r md:w-1/4 p-3'>
                  <div className='w-1/2 h-1/2 text-center md:text-left md:h-24'>
                    <h6 className='text-base lg:text-2xl'>Cameras</h6>
                    <p>{productState && productState?.filter((prod) => prod?.category === "Camera")?.length} Items</p>
                  </div>
                  <img 
                    src={productState && productState?.filter((prod) => prod?.category === "Camera")[0]?.images[0]?.url} 
                    alt="camera"
                    className='w-1/2 h-1/2 md:h-20'
                  />
                </div>

                <div className='flex items-center gap-5 border-b w-full md:border-r md:w-1/4 p-3'>
                  <div className='w-1/2 h-1/2 text-center md:text-left md:h-24'>
                    <h6 className='text-base lg:text-2xl'>Smart TV</h6>
                    <p>{productState && productState?.filter((prod) => prod?.category === "Television")?.length} Items</p>
                  </div>
                  <img 
                    src={productState && productState?.filter((prod) => prod?.category === "Television")[0]?.images[0]?.url} 
                    className='w-1/2 h-1/2 md:h-20'
                    alt="tv" 
                  />
                </div>

                <div className='flex items-center gap-5 border-b w-full md:border-r md:w-1/4 p-3'>
                  <div className='w-1/2 h-1/2 text-center md:text-left md:h-24'>
                    <h6 className='text-base lg:text-2xl'>Smart Watch</h6>
                    <p>{productState && productState?.filter((prod) => prod?.category === "Watch")?.length} Items</p>
                  </div>
                  <img 
                    src={productState && productState?.filter((prod) => prod?.category === "Watch")[0]?.images[0]?.url} 
                    className='w-1/2 h-1/2 md:h-20'
                    alt="watch" 
                  />
                </div>

                <div className='flex items-center gap-5 border-b w-full md:w-1/4 p-3'>
                  <div className='w-1/2 h-1/2 text-center md:text-left md:h-24'>
                    <h6 className='text-base lg:text-2xl'>Music & Gamings</h6>
                    <p>{productState && productState?.filter((prod) => prod?.category === "Headphone")?.length} Items</p>
                  </div>
                  <img 
                    src={productState && productState?.filter((prod) => prod?.category === "Headphone")[0]?.images[0]?.url} 
                    className='w-1/2 h-1/2 md:h-20'
                    alt="headphone" 
                  />
                </div>

                <div className='hidden md:flex items-center gap-5 border-b w-full md:border-r md:w-1/4 p-3'>
                  <div className='w-1/2 h-1/2 text-center md:text-left md:h-24'>
                    <h6 className='text-base lg:text-2xl'>Laptop</h6>
                    <p>{productState && productState?.filter((prod) => prod?.category === "Laptop")?.length} Items</p>
                  </div>
                  <img 
                    src={productState && productState?.filter((prod) => prod?.category === "Laptop")[0]?.images[0]?.url} 
                    className='w-1/2 h-1/2 md:h-20'
                    alt="Laptop" 
                  />
                </div>

                <div className='hidden md:flex items-center gap-5 border-b w-full md:border-r md:w-1/4 p-3'>
                  <div className='w-1/2 h-1/2 text-center md:text-left md:h-24'>
                    <h6 className='text-base lg:text-2xl'>Speaker</h6>
                    <p>{productState && productState?.filter((prod) => prod?.category === "Speaker")?.length} Items</p>
                  </div>
                  <img 
                    src={productState && productState?.filter((prod) => prod?.category === "Speaker")[0]?.images[0]?.url} 
                    className='w-1/2 h-1/2 md:h-20'
                    alt="Speaker" 
                  />
                </div>

                <div className='hidden md:flex items-center gap-5 border-b w-full md:border-r md:w-1/4 p-3'>
                  <div className='w-1/2 h-1/2 text-center md:text-left md:h-24'>
                    <h6 className='text-base lg:text-2xl'>Smart Phone</h6>
                    <p>{productState && productState?.filter((prod) => prod?.category === "Smartphone")?.length} Items</p>
                  </div>
                  <img 
                    src={productState && productState?.filter((prod) => prod?.category === "Smartphone")[0]?.images[0]?.url} 
                    className='w-1/2 h-1/2 md:h-20'
                    alt="Smartphone" 
                  />
                </div>

                <div className='hidden md:flex items-center gap-5 border-b w-full md:w-1/4 p-3'>
                  <div className='w-1/2 h-1/2 text-center md:text-left md:h-24'>
                    <h6 className='text-base lg:text-2xl'>Processor</h6>
                    <p>{productState && productState?.filter((prod) => prod?.category === "Processor")?.length} Items</p>
                  </div>
                  <img 
                    src={productState && productState?.filter((prod) => prod?.category === "Processor")[0]?.images[0]?.url} 
                    className='w-1/2 h-1/2 md:h-20'
                    alt="Processor" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured collection home section */}
      {
        productState && productState?.filter((item, index) => {
          if(item?.tags === "featured") {
            return item;
          }
        }).length > 0 && 
        <section className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-2 lg:gap-5">
              <div className="col-span-12 text-center md:text-left">
                <h3 className='text-lg font-medium mb-3 md:text-xl lg:text-2xl lg:mb-5'>Featured Collections</h3>
              </div>
              
              <ProductCard
                grid={grid} 
                data={
                  productState ? productState?.filter((item, index) => {
                    if(item?.tags === "featured") {
                      return item;
                    }
                  }) : []
                } 
              />
            </div>
          </div>
        </section>
      }
      

      {/* Famous home section */}
      <section className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-4 lg:gap-5">
            <div className='col-span-12 sm:col-span-6 lg:col-span-3 relative bg-black h-96 rounded-md'>
              <img className='absolute bottom-9 w-5/6 mx-7' src="images/famous-1.png" alt="famous" />
              <div className="absolute top-5 left-5">
                <h5 className='text-sm text-white font-normal mb-2 uppercase'>Big Screen</h5>
                <h6 className='text-2xl text-white font-medium mb-2'>Smart Watch Series 7</h6>
                <p className='text-base text-white font-thin'>From $399.00 or $16.62/mo for 24 mo.</p>
              </div>
            </div>

            <div className='col-span-12 sm:col-span-6 lg:col-span-3 relative bg-white h-96 rounded-md'>
              <img className='absolute bottom-9 w-5/6 mx-7' src="images/famous-2.png" alt="famous" />
              <div className="absolute top-5 left-5">
                <h5 className='text-sm text-black font-normal mb-2 uppercase'>Studio Display</h5>
                <h6 className='text-2xl text-black font-medium mb-2'>600 nits of brightness.</h6>
                <p className='text-base text-black font-thin'>27-inch 5K Retina display</p>
              </div>
            </div>

            <div className='hidden col-span-12 sm:block sm:col-span-6 lg:col-span-3 relative bg-white h-96 rounded-md'>
              <img className='absolute bottom-0 w-5/6 mx-7' src="images/famous-3.png" alt="famous" />
              <div className="absolute top-5 left-5">
                <h5 className='text-sm text-black font-normal mb-2 uppercase'>smartphones</h5>
                <h6 className='text-2xl text-black font-medium mb-2'>Smartphone 13 Pro.</h6>
                <p className='text-base text-black font-thin'>Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*</p>
              </div>
            </div>

            <div className='hidden sm:block col-span-12 sm:col-span-6 lg:col-span-3 relative bg-white h-96 rounded-md'>
              <img className='absolute bottom-0 w-5/6 mx-7' src="images/famous-4.png" alt="famous" />
              <div className="absolute top-5 left-5">
                <h5 className='text-sm text-black font-normal mb-2 uppercase'>home speakers</h5>
                <h6 className='text-2xl text-black font-medium mb-2'>Room-filling sound.</h6>
                <p className='text-base text-black font-thin'>From $699 or $116.58/mo. for 12 mo.*</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Special products home section */}
      {
        productState && productState?.filter((item, index) => {
          if(item?.tags === "special") {
            return item;
          }
        }).length > 0 && 
        <section className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-2 lg:gap-5">
              <div className="col-span-12 text-center md:text-left">
                <h3 className='text-lg font-medium mb-3 md:text-xl lg:text-2xl lg:mb-5'>Special Products</h3>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 sm:gap-5 md:gap-6 lg:gap-5">
              {
                productState && productState?.map((item, index) => {
                  if(item?.tags === "special" && index < 10) {
                    return (
                      <SpecialProduct 
                        key={index} 
                        id={item?._id}
                        brand={item?.brand} 
                        title={item?.title} 
                        totalRating={item?.totalRating}
                        price={item?.price} 
                        quantity={item?.quantity} 
                        sold={item?.sold}
                        image={item?.images[0]?.url} 
                      />
                    )
                  }
                })
              }
            </div>
          </div>
        </section>
      }
      
      {/* Popular products home section */}
      {
        productState && productState?.filter((item, index) => {
          if(item?.tags === "popular") {
            return item;
          }
        }).length > 0 && 
        <section className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-2 lg:gap-5">
              <div className="col-span-12 text-center md:text-left">
                <h3 className='text-lg font-medium mb-3 md:text-xl lg:text-2xl lg:mb-5'>Our Popular Products</h3>
              </div>

              <ProductCard
                grid={grid} 
                data={
                  productState ? productState?.filter((item, index) => {
                    if(item?.tags === "popular") {
                      return item;
                    }
                  }) : []
                } 
              />
            </div>
          </div>
        </section>
      }

      {/* Marquee brands home section */}
      <section className="py-5 mb-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="bg-white shadow-all p-4">
                <Marquee className='flex'>
                  <div className='mx-2 w-1/3'>
                    <img src="images/brand-01.png" alt="brand" />
                  </div>

                  <div className='mx-2 w-1/3'>
                    <img src="images/brand-02.png" alt="brand" />
                  </div>

                  <div className='mx-2 w-1/3'>
                    <img src="images/brand-03.png" alt="brand" />
                  </div>

                  <div className='mx-2 w-1/3'>
                    <img src="images/brand-04.png" alt="brand" />
                  </div>

                  <div className='mx-2 w-1/3'>
                    <img src="images/brand-05.png" alt="brand" />
                  </div>

                  <div className='mx-2 w-1/3'>
                    <img src="images/brand-06.png" alt="brand" />
                  </div>

                  <div className='mx-2 w-1/3'>
                    <img src="images/brand-07.png" alt="brand" />
                  </div>

                  <div className='mx-2 w-1/3'>
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest news home section */}
      {
        blogState && blogState?.length > 0 && 
        <section className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-2 lg:gap-5">
              <div className="col-span-12 text-center md:text-left">
                <h3 className='text-lg font-medium mb-3 md:text-xl lg:text-2xl lg:mb-5'>Latest news</h3>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3 mb-10">
              {
                blogState && blogState?.map((item, index) => {
                    if(index < 4) {
                      return (
                        <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4">
                          <BlogCard
                              id={item?._id}
                              title={item?.title}
                              description={item?.description}
                              image={item?.images[0]?.url} 
                              date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm a')}
                          />
                        </div>
                      );
                    }
                  }
                )
              }
            </div>
          </div>
        </section>
      }

    </div>
  )
}

export default Home