import React from 'react'
import {NavLink, Link} from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';

const Home = () => {
  return (
    <div className='bg-gray-200'>
      {/* Banners home section */}
      <section className="py-5 mb-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <div className="p-3 relative">
                <img src="images/main-banner-1.jpg" className='rounded-md' alt="main Banner" />
                <div className="absolute top-16 left-5 p-1 gap-6">
                  <h4 className='text-xl tracking-wide text-orange-500 ml-2 font-normal capitalize leading-6'>SUPERCHARGED FOR PROS.</h4>
                  <h5 className='text-5xl tracking-tight ml-1 font-medium leading-10 mt-5'>iPad S13+ Pro.</h5>
                  <p className='text-xl tracking-wide leading-6 ml-2 mt-5'>From $123 or $10/mo.</p>
                  <Link className='rounded-3xl text-white bg-cyan-950 px-8 py-3 text-lg hover:bg-orange-500 hover:text-black ml-2 mt-5'>BUY NOW</Link>
                </div>
              </div>
            </div>

            <div className="col-span-6">
              <div className="flex flex-wrap justify-between items-center">
                <div className="p-3 relative w-1/2">
                  <img src="images/catbanner-01.jpg" className='rounded-md' alt="main Banner" />
                  <div className="absolute top-14 left-6 p-1 gap-6">
                    <h4 className=' text-base tracking-wide text-orange-500 ml-2 font-normal uppercase leading-6'>Best Sale.</h4>
                    <h5 className='text-xl tracking-tight ml-1 font-medium leading-10 mt-3'>iPad S13+ Pro.</h5>
                    <p className='text-base tracking-wide leading-6 ml-2 mt-3'>From $123 <br /> or $10/mo.</p>
                  </div>
                </div>

                <div className="p-3 relative w-1/2">
                  <img src="images/catbanner-02.jpg" className='rounded-md' alt="main Banner" />
                  <div className="absolute top-14 left-6 p-1 gap-6">
                    <h4 className=' text-base tracking-wide text-orange-500 ml-2 font-normal uppercase leading-6'>New arrival.</h4>
                    <h5 className='text-xl tracking-tight ml-1 font-medium leading-10 mt-3'>iPad S13+ Pro.</h5>
                    <p className='text-base tracking-wide leading-6 ml-2 mt-3'>From $123 <br /> or $10/mo.</p>
                  </div>
                </div>

                <div className="p-3 relative w-1/2">
                  <img src="images/catbanner-03.jpg" className='rounded-md' alt="main Banner" />
                  <div className="absolute top-14 left-6 p-1 gap-6">
                    <h4 className=' text-base tracking-wide text-orange-500 ml-2 font-normal uppercase leading-6'>SUPERCHARGED FOR PROS.</h4>
                    <h5 className='text-xl tracking-tight ml-1 font-medium leading-10 mt-3'>iPad S13+ Pro.</h5>
                    <p className='text-base tracking-wide leading-6 ml-2 mt-3'>From $123 <br /> or $10/mo.</p>
                  </div>
                </div>

                <div className="p-3 relative w-1/2">
                  <img src="images/catbanner-04.jpg" className='rounded-md' alt="main Banner" />
                  <div className="absolute top-14 left-6 p-1 gap-6">
                    <h4 className=' text-base tracking-wide text-orange-500 ml-2 font-normal uppercase leading-6'>SUPERCHARGED FOR PROS.</h4>
                    <h5 className='text-xl tracking-tight ml-1 font-medium leading-10 mt-3'>iPad S13+ Pro.</h5>
                    <p className='text-base tracking-wide leading-6 ml-2 mt-3'>From $123 <br /> or $10/mo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sevices home section */}
      <section className="py-5 mb-6 bg-gray-300">
        <div className="container mx-auto">
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="flex justify-between items-center">
                <div className="p-3 flex items-center gap-3">
                  <img src="images/service.png" className='rounded-md' alt="services" />
                  <div className="">
                    <h6 className='font-medium'>Free Shipping.</h6>
                    <p className=''>From all orders over $5.</p>
                  </div>
                </div>

                <div className="p-3 flex items-center gap-3">
                  <img src="images/service-02.png" className='rounded-md' alt="services" />
                  <div className="">
                    <h6 className='font-medium'>Daily Suprise Offer.</h6>
                    <p className=''>Save up to $5.</p>
                  </div>
                </div>

                <div className="p-3 flex items-center gap-3">
                  <img src="images/service-03.png" className='rounded-md' alt="services" />
                  <div className="">
                    <h6 className='font-medium'>Support 24/7.</h6>
                    <p className=''>Shop with an expert.</p>
                  </div>
                </div>

                <div className="p-3 flex items-center gap-3">
                  <img src="images/service-04.png" className='rounded-md' alt="services" />
                  <div className="">
                    <h6 className='font-medium'>Affordable Price.</h6>
                    <p className=''>Get factory default price.</p>
                  </div>
                </div>

                <div className="p-3 flex items-center gap-3">
                  <img src="images/service-05.png" className='rounded-md' alt="services" />
                  <div className="">
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
      <section className="py-5 mb-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="bg-white shadow-all flex flex-wrap justify-between items-center p-3">
                <div className='flex items-center gap-5 border-b border-r w-1/4 p-3'>
                  <div>
                    <h6 className='text-2xl'>Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>

                <div className='flex items-center gap-5 border-b border-r w-1/4 p-3'>
                  <div>
                    <h6 className='text-2xl'>Smart TV</h6>
                    <p>12 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="tv" />
                </div>

                <div className='flex items-center gap-5 border-b border-r w-1/4 p-3'>
                  <div>
                    <h6 className='text-2xl'>Smart Watches</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="watch" />
                </div>

                <div className='flex items-center gap-5 border-b w-1/4 p-3'>
                  <div>
                    <h6 className='text-2xl'>Music & Gamings</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="game" />
                </div>

                <div className='flex items-center gap-8 border-r w-1/4 p-3'>
                  <div>
                    <h6 className='text-2xl'>Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>

                <div className='flex items-center gap-5 border-r w-1/4 p-3'>
                  <div>
                    <h6 className='text-2xl'>Smart TV</h6>
                    <p>12 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="tv" />
                </div>

                <div className='flex items-center gap-5 border-r w-1/4 p-3'>
                  <div>
                    <h6 className='text-2xl'>Smart Watches</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="watch" />
                </div>

                <div className='flex items-center gap-5 w-1/4 p-3'>
                  <div>
                    <h6 className='text-2xl'>Music & Gamings</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="game" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured collection home section */}
      <section className="py-5 mb-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12">
              <h3 className='text-2xl font-medium mb-5'>Featured Collections</h3>
            </div>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

      {/* Famous home section */}
      <section className="py-5 mb-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-5">
            <div className='col-span-3 relative bg-black h-96 rounded-md'>
              <img className='absolute bottom-9 w-5/6 mx-7' src="images/famous-1.png" alt="famous" />
              <div className="absolute top-5 left-5">
                <h5 className='text-sm text-white font-normal mb-2 uppercase'>Big Screen</h5>
                <h6 className='text-2xl text-white font-medium mb-2'>Smart Watch Series 7</h6>
                <p className='text-base text-white font-thin'>From $399.00 or $16.62/mo for 24 mo.</p>
              </div>
            </div>

            <div className='col-span-3 relative bg-white h-96 rounded-md'>
              <img className='absolute bottom-9 w-5/6 mx-7' src="images/famous-2.png" alt="famous" />
              <div className="absolute top-5 left-5">
                <h5 className='text-sm text-black font-normal mb-2 uppercase'>Studio Display</h5>
                <h6 className='text-2xl text-black font-medium mb-2'>600 nits of brightness.</h6>
                <p className='text-base text-black font-thin'>27-inch 5K Retina display</p>
              </div>
            </div>

            <div className='col-span-3 relative bg-white h-96 rounded-md'>
              <img className='absolute bottom-0 w-5/6 mx-7' src="images/famous-3.png" alt="famous" />
              <div className="absolute top-5 left-5">
                <h5 className='text-sm text-black font-normal mb-2 uppercase'>smartphones</h5>
                <h6 className='text-2xl text-black font-medium mb-2'>Smartphone 13 Pro.</h6>
                <p className='text-base text-black font-thin'>Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*</p>
              </div>
            </div>

            <div className='col-span-3 relative bg-white h-96 rounded-md'>
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
      <section className="py-5 mb-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12">
              <h3 className='text-2xl font-medium mb-5'>Special Products</h3>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5">
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
          </div>
        </div>
      </section>
      
      {/* Popular products home section */}
      <section className="py-5 mb-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12">
              <h3 className='text-2xl font-medium mb-5'>Our Popular Products</h3>
            </div>

            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

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
      <section className="py-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
              <h3 className='text-2xl font-medium mb-5'>Latest news</h3>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-3 mb-10">
            <div className="col-span-3">
              <BlogCard />
            </div>

            <div className="col-span-3">
              <BlogCard />
            </div>

            <div className="col-span-3">
              <BlogCard />
            </div>

            <div className="col-span-3">
              <BlogCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home