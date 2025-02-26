import React, { useEffect } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../features/user/userSlice';

const Order = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(state => state?.user?.orders);

  // console.log(orderState);
  
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  return (
    <>
      <Meta title="My Orders" />
      <BreadCrum title="My Orders" />

      <div className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
          <div className="container mx-auto">
              {orderState?.length === 0 && <div className='col-span-12 text-center font-medium text-xl'>No Data</div>}
              {/* table headers */}
              {
                orderState?.length > 0 && 
                <div className="grid grid-cols-12 gap-4 bg-orange-400 p-1 sm:p-3">
                  <div className='col-span-3'>
                    <h5 className='text-sm text-center font-medium sm:text-left sm:text-lg sm:font-semibold'>Order ID</h5>
                  </div>
                  <div className='col-span-3'>
                    <h5 className='text-sm text-center font-medium sm:text-left sm:text-lg sm:font-semibold'>Total amount</h5>
                  </div>
                  <div className='col-span-3'>
                    <h5 className='text-sm text-center font-medium sm:text-left sm:text-lg sm:font-semibold'>Total amount after discount</h5>
                  </div>
                  <div className='col-span-3'>
                    <h5 className='text-sm text-center font-medium sm:text-left sm:text-lg sm:font-semibold'>Status</h5>
                  </div>
                </div>
              }

              {/* orders data */}
              {orderState && orderState?.map((order, index) => {
                  return (
                    <div key={index} className="grid grid-cols-12 gap-4 mt-3 bg-cyan-800 p-3 text-white">
                      <div className='col-span-3'>
                        <h5 className='text-sm font-light sm:text-left sm:text-base sm:font-normal'>{order?._id?.length > 4 ? order?._id?.substr(0,4) + "..." : order?._id}</h5>
                      </div>
                      <div className='col-span-3'>
                        <h5 className='text-sm font-light sm:text-left sm:text-base md:font-normal'>{order?.totalPrice}</h5>
                      </div>
                      <div className='col-span-3'>
                        <h5 className='text-sm font-light sm:text-left sm:text-base sm:font-normal'>{order?.totalPriceAfterDiscount}</h5>
                      </div>
                      <div className='col-span-3'>
                        <h5 className='text-sm font-light sm:text-left sm:text-base sm:font-normal'>{order?.orderStatus}</h5>
                      </div>

                      {/* order items table headers */}
                      <div className="col-span-12">
                        <div className='grid grid-cols-12 gap-4 bg-cyan-700 mt-3 p-1 sm:p-3'>
                          <div className='col-span-3'>
                            <h5 className='text-sm text-center font-medium sm:text-left sm:text-lg sm:font-semibold'>Product name</h5>
                          </div>
                          <div className='col-span-3'>
                            <h5 className='text-sm text-center font-medium sm:text-left sm:text-lg sm:font-semibold'>Quantity</h5>
                          </div>
                          <div className='col-span-3'>
                            <h5 className='text-sm text-center font-medium sm:text-left sm:text-lg sm:font-semibold'>Price</h5>
                          </div>
                          <div className='col-span-3'>
                            <h5 className='text-sm text-center font-medium sm:text-left sm:text-lg sm:font-semibold'>Color</h5>
                          </div>
                        </div>

                        {/* order items */}
                        {
                          order?.orderItems?.map((item, index) => {
                            return (
                              <div key={index} className="col-span-12">
                                <div className='grid grid-cols-12 gap-4 bg-cyan-600 p-3'>
                                  <div className='col-span-3'>
                                    <h5 className='text-sm font-light sm:text-left sm:text-base sm:font-normal'>{item?.product?.title?.length > 10 ? item?.product?.title?.substr(0,10) + "..." : item?.product?.title}</h5>
                                  </div>
                                  <div className='col-span-3'>
                                    <h5 className='text-sm font-light sm:text-left sm:text-base sm:font-normal'>{item?.quantity}</h5>
                                  </div>
                                  <div className='col-span-3'>
                                    <h5 className='text-sm font-light sm:text-left sm:text-base sm:font-normal'>{item?.price}</h5>
                                  </div>
                                  <div className='col-span-3'>
                                    <div style={{backgroundColor: item?.color?.title}} className='w-5 h-5 rounded-full'></div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                }
              )}
          </div>
      </div>
    </>
  )
}

export default Order