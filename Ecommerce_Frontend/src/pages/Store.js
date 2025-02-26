import React, { useEffect, useState } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import {NavLink, Link} from "react-router-dom";
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../features/product/productSlice';
import { getAllProdCate } from '../features/productCate/productCateSlice';
import { getAllBrand } from '../features/brand/brandSlice';
import { getAllColor } from '../features/color/colorSlice';

const Store = () => {
  const [grid, setGrid] = useState(3);
  const dispatch = useDispatch();

  const productState = useSelector(state => state?.product?.products);
  const prodCateState = useSelector(state => state?.prodCate?.prodCates);
  const brandState = useSelector(state => state?.brand?.brands);
  const colorState = useSelector(state => state?.color?.colors);

  //Filter criterias
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [sort, setSort] = useState();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();

  // useEffect(() => {
    // dispatch(getAllProdCate());
    // dispatch(getAllBrand());
    // dispatch(getAllColor());

  // }, []);

  useEffect(() => {
    let brands = [];
    let categories = [];
    let tags = [];
    for (let index = 0; index < productState.length; index++) {
      brands.push(productState[index]?.brand);
      categories.push(productState[index]?.category);
      tags.push(productState[index]?.tags);
    }

    setBrands(brands);
    setCategories(categories);
    setTags(tags);
  }, [productState]);
// console.log({sort, tags: selectedTag, brand, category, minPrice, maxPrice});

  useEffect(() => {
    getProducts();
  }, [sort, selectedTag, brand, category, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(getAllProduct({sort, tags: selectedTag, brand, category, minPrice, maxPrice}));
  };
  
  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) {
        setGrid(12); // Mobile: Show 1 items
      } else if (window.innerWidth < 1024) {
        setGrid(5); // Tablet: Show 2 items
      } else {
        setGrid(3); // Desktop: Show 4 items
      }
    };

    updateItems(); // Run on mount
    window.addEventListener("resize", updateItems);

    return () => window.removeEventListener("resize", updateItems);
  }, []);

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrum title="Our Store" />

      <div className="py-5">
        <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-4">
              {/* Filter left part */}
              <div className="md:col-span-3 hidden md:block">
                <div className="bg-white rounded-md px-4 py-3 mb-3">
                  <h3 className='text-base font-semibold mb-5'>Shop By Categories</h3>

                  <div>
                    <ul className='text-sm list-none cursor-pointer flex gap-2 flex-wrap'>
                      {
                        categories && [...new Set(categories)]?.map((item, index) => (
                          <li onClick={() => setCategory(item)} key={index} className='hover:font-medium'>{item}</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-md px-4 py-3 mb-3">
                  <h3 className='text-base font-semibold mb-5'>Filter By</h3>

                  <div>
                    {/* <h5 className="text-sm font-semibold mb-2">Availability</h5> */}

                    {/* Available checkbox */}
                    {/* <form>
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-3">
                          <div className="space-y-10">
                            <fieldset>
                              <div className="space-y-1">
                                <div className="relative flex gap-x-3">
                                  <div className="flex h-6 items-center">
                                    <input
                                      id="inStock"
                                      name="inStock"
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                    />
                                  </div>
                                  <div className="text-sm leading-6">
                                    <label htmlFor="inStock" className="text-sm list-none cursor-pointer text-gray-900">
                                      In Stock (1)
                                    </label>
                                  </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                  <div className="flex h-6 items-center">
                                    <input
                                      id="outStock"
                                      name="outStock"
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                    />
                                  </div>
                                  <div className="text-sm leading-6">
                                    <label htmlFor="outStock" className="text-sm list-none cursor-pointer text-gray-900">
                                      Out of stock (0)
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </form> */}

                    <h5 className="text-sm font-semibold mb-2 mt-2">Price</h5>

                    {/* Price input */}
                    <form>
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-3">
                          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <div className="mt-2">
                                <input
                                  type="number"
                                  name="from"
                                  id="from"
                                  value={minPrice}
                                  onChange={(e) => setMinPrice(e.target.value)}
                                  placeholder='From'
                                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <div className="mt-2">
                                <input
                                  type="number"
                                  name="to"
                                  id="to"
                                  value={maxPrice}
                                  onChange={(e) => setMaxPrice(e.target.value)}
                                  placeholder='To'
                                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    {/* Color picker */}
                    {/* <h5 className="text-sm font-semibold mb-2 mt-2">Color</h5>
                    
                    <div>
                      <div className='border-b border-gray-900/10 pb-3'>
                        <Color />
                      </div>
                    </div> */}

                    {/* Size */}
                    {/* <h5 className="text-sm font-semibold mb-2 mt-2">Size</h5>

                    <form>
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-3">
                          <div className="space-y-10">
                            <fieldset>
                              <div className="space-y-1">
                                <div className="relative flex gap-x-3">
                                  <div className="flex h-6 items-center">
                                    <input
                                      id="sizeS"
                                      name="sizeS"
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                    />
                                  </div>
                                  <div className="text-sm leading-6">
                                    <label htmlFor="sizeS" className="text-sm list-none cursor-pointer text-gray-900">
                                      S (3)
                                    </label>
                                  </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                  <div className="flex h-6 items-center">
                                    <input
                                      id="sizeM"
                                      name="sizeM"
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                    />
                                  </div>
                                  <div className="text-sm leading-6">
                                    <label htmlFor="sizeM" className="text-sm list-none cursor-pointer text-gray-900">
                                      M (2)
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </form> */}
                  </div>
                </div>

                <div className="bg-white rounded-md px-4 py-3 mb-3">
                  <h3 className='text-base font-semibold mb-5'>Product Tags</h3>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      {
                        tags && [...new Set(tags)]?.map((item, index) => (
                          <span onClick={() => setSelectedTag(item)} key={index} className="rounded-md py-2 px-3 bg-gray-200 text-gray-500 text-sm">
                            {item}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-md px-4 py-3 mb-3">
                  <h3 className='text-base font-semibold mb-5'>Product Brands</h3>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      {
                        brands && [...new Set(brands)]?.map((item, index) => (
                          <span onClick={() => setBrand(item)} key={index} className="rounded-md py-2 px-3 bg-gray-200 text-gray-500 text-sm">
                            {item}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                </div>

                <div 
                  className='rounded-md text-white text-center bg-cyan-600 p-2 my-6 text-md hover:bg-cyan-700 w-fit cursor-pointer' 
                  onClick={() => {
                    setCategory();
                    setMinPrice("");
                    setMaxPrice("");
                    setBrand();
                    setSelectedTag();
                  }}
                >
                    Clear Filter
                </div>

                {/* <div className="bg-white rounded-md px-4 py-3 mb-3 mt-2">
                  <h3 className='text-base font-semibold mb-5'>Random Products</h3>

                  <div>
                    <div className="flex border-b border-gray-900/10 pb-3">
                      <div className="w-1/3 mr-2">
                        <img src="images/watch.jpg" alt="watch" />
                      </div>

                      <div className="w-2/3">
                        <h5 className='text-base text-cyan-950 font-semibold mb-2'>Kids headphone bilk 10 pack sdfasdjbvj.</h5>
                        
                        <ReactStars
                            count={5}
                            value={4}
                            edit={false}
                            size={24}
                            activeColor="#ffd700"
                        />

                        <b>$100</b>
                      </div>
                    </div>

                    <div className="flex mt-3">
                      <div className="w-1/3 mr-2">
                        <img src="images/tv.jpg" alt="watch" />
                      </div>

                      <div className="w-2/3">
                        <h5 className='text-base text-cyan-950 font-semibold mb-2'>Kids headphone bilk 10 pack lsfas.</h5>
                        
                        <ReactStars
                            count={5}
                            value={4}
                            edit={false}
                            size={24}
                            activeColor="#ffd700"
                        />

                        <b>$100</b>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Right part */}
              <div className="col-span-12 md:col-span-9">
                <div className='bg-white rounded-md p-2 px-5 mb-4 hidden sm:block'>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <p className='mb-0 block text-nowrap'>Sort by:</p>
                      
                      <select
                        id="sortBy"
                        name="sortBy"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        defaultValue={"title"}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="title">Alphabetically, A-Z</option>
                        <option value="-title">Alphabetically, Z-A</option>
                        <option value="price">Price, low to high</option>
                        <option value="-price">Price, high to low</option>
                        <option value="createdAt">Date, old to new</option>
                        <option value="-createdAt">Date, new to old</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className='mb-0'>21 Products</p>
                      <div className="flex items-center gap-3">
                        <img src="images/gr4.svg" onClick={() => {setGrid(3);}} className='block w-9 h-9 p-2 rounded bg-gray-200 cursor-pointer' alt="grid" />
                        {/* <img src="images/gr3.svg" onClick={() => {setGrid(4);}} className='block w-9 h-9 p-2 rounded bg-gray-200 cursor-pointer' alt="grid" /> */}
                        <img src="images/gr2.svg" onClick={() => {setGrid(5);}} className='block w-9 h-9 p-2 rounded bg-gray-200 cursor-pointer' alt="grid" />
                        <img src="images/gr.svg" onClick={() => {setGrid(12);}} className='block w-9 h-9 p-2 rounded bg-gray-200 cursor-pointer' alt="grid" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pb-5 grid grid-cols-12 gap-3">
                  <ProductCard grid={grid} data={productState ? productState : []} />
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Store