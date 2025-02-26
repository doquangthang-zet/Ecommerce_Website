import React, { useEffect, useState } from 'react'
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getMonthlyOrderIncome, getYearlyOrderIncome } from '../features/auth/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyIncomeState = useSelector((state) => state?.auth?.monthlyOrders);
  const yearlyIncomeState = useSelector((state) => state?.auth?.yearlyOrders);
  const orderState = useSelector((state) => state?.auth?.orders);
  const userState = useSelector((state) => state?.auth);

  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlyCount, setDataMonthlyCount] = useState([]);

  const [orderData, setOrderData] = useState([]);

  
  const columns = [
    {
      title: 'Sno',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product count',
      dataIndex: 'product',
    },
    {
      title: 'Total price',
      dataIndex: 'price',
    },
    {
      title: 'Total price after discount',
      dataIndex: 'price_after_discount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];

  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    style: {
      fill: ({ type }) => {
        return '#A855F7';
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.income);
        return (val).toFixed(1) + "$";
      },
      offset: 10,
    },
    legend: false,
  };

  const configCount = {
    data: dataMonthlyCount,
    xField: 'type',
    yField: 'count',
    style: {
      fill: ({ type }) => {
        return '#A855F7';
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.count);
        return (val).toFixed(1);
      },
      offset: 10,
    },
    legend: false,
  };

  useEffect(() => {
    dispatch(getMonthlyOrderIncome());
    dispatch(getAllOrders());
    dispatch(getYearlyOrderIncome());
  }, []);

  useEffect(() => {
    let data = [];
    let dataMonthCount = [];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dataTable = [];
    
    if (monthlyIncomeState !== undefined) {
      for (let index = 0; index < monthlyIncomeState?.length; index++) {
        const element = monthlyIncomeState[index];
        data.push({
          type: months[element?._id?.month],
          income: element?.amount,
        });
        dataMonthCount.push({
          type: months[element?._id?.month],
          count: element?.count,
        });
      }
    }

    if (orderState !== undefined) {
      for (let i = 0; i < orderState?.length; i++) {
        dataTable.push({
          key: i + 1,
          name: orderState[i]?.user?.firstname,
          product: orderState[i]?.orderItems?.count,
          price: orderState[i]?.totalPrice,
          price_after_discount: orderState[i]?.totalPriceAfterDiscount,
          status: orderState[i]?.orderStatus,
        });
      }
    }


    setDataMonthly(data);
    setDataMonthlyCount(dataMonthCount);
    setOrderData(dataTable);
  }, [yearlyIncomeState, orderState, monthlyIncomeState]);

  return (
    <div>
      <h3 className='text-2xl font-bold mb-4'>Dashboard</h3>

      {/* Total */}
      <div className='flex justify-between items-center gap-5'>
        <div className='flex flex-grow justify-between items-end bg-white p-3 rounded-md'>
          <div>
            <p className='text-lg font-medium mb-3'>Total income</p>
            <h4 className='mb-0 text-xl font-semibold'>${yearlyIncomeState?.length > 0 ? yearlyIncomeState[0]?.amount : "0"}</h4>
          </div>
          <div className='flex flex-col items-end'>
            <p className='mb-0'>Income in 1 year from today</p>
          </div>
        </div>
        <div className='flex flex-grow justify-between items-end bg-white p-3 rounded-md'>
          <div>
            <p className='text-lg font-medium mb-3'>Total orders</p>
            <h4 className='mb-0 text-xl font-semibold'>#{yearlyIncomeState?.length > 0 ? yearlyIncomeState[0]?.count : "0"}</h4>
          </div>
          <div className='flex flex-col items-end'>
            <p className='mb-0'>Orders in 1 year from today</p>
          </div>
        </div>
      </div>

      <div className='flex justify-between gap-3'>
        {/* Column chart */}
        <div className="mt-4 flex-grow-1 w-1/2">
          <h3 className="text-2xl font-bold mb-4">Income Statistics</h3>
          <div>
            {
              monthlyIncomeState?.length > 0 ? <Column {...monthlyIncomeState && config} /> : <div className='text-lg font-medium w-full text-center m-3'>No data</div>
            }
          </div>
        </div>

        {/* Column chart order count */}
        <div className="mt-4 flex-grow-1 w-1/2">
          <h3 className="text-2xl font-bold mb-4">Order count Statistics</h3>
          <div>
            {
              monthlyIncomeState?.length > 0 ? <Column {...monthlyIncomeState && config} /> : <div className='text-lg font-medium w-full text-center m-3'>No data</div>
            }
          </div>
        </div>
      </div>


      {/* Recent orders */}
      <div className="mt-4">
        <div className="text-2xl font-bold mb-4">Recent Orders</div>  
        <div>
          <Table columns={columns} dataSource={orderState && orderData} />
        </div>
      </div>
    </div>

//     <div>
//   <h3 className='text-2xl font-bold mb-4'>Dashboard</h3>

//   {/* Total Income & Orders */}
//   <div className='flex flex-wrap justify-between items-center gap-5'>
//     <div className='flex flex-grow justify-between items-end bg-white p-3 rounded-md w-full md:w-1/2'>
//       <div>
//         <p className='text-lg font-medium mb-3'>Total income</p>
//         <h4 className='mb-0 text-xl font-semibold'>${yearlyIncomeState?.length > 0 ? yearlyIncomeState[0]?.amount : "0"}</h4>
//       </div>
//       <div className='flex flex-col items-end'>
//         <p className='mb-0'>Income in 1 year from today</p>
//       </div>
//     </div>

//     <div className='flex flex-grow justify-between items-end bg-white p-3 rounded-md w-full md:w-1/2'>
//       <div>
//         <p className='text-lg font-medium mb-3'>Total orders</p>
//         <h4 className='mb-0 text-xl font-semibold'>#{yearlyIncomeState?.length > 0 ? yearlyIncomeState[0]?.count : "0"}</h4>
//       </div>
//       <div className='flex flex-col items-end'>
//         <p className='mb-0'>Orders in 1 year from today</p>
//       </div>
//     </div>
//   </div>

//   {/* Charts Section */}
//   <div className='flex flex-col md:flex-row justify-between gap-3'>
//     <div className="mt-4 flex-grow-1 w-full md:w-1/2">
//       <h3 className="text-2xl font-bold mb-4">Income Statistics</h3>
//       <div>
//         {monthlyIncomeState?.length > 0 ? <Column {...config} /> : <div className='text-lg font-medium w-full text-center m-3'>No data</div>}
//       </div>
//     </div>

//     <div className="mt-4 flex-grow-1 w-full md:w-1/2">
//       <h3 className="text-2xl font-bold mb-4">Order Count Statistics</h3>
//       <div>
//         {monthlyIncomeState?.length > 0 ? <Column {...configCount} /> : <div className='text-lg font-medium w-full text-center m-3'>No data</div>}
//       </div>
//     </div>
//   </div>

//   {/* Recent Orders */}
//   <div className="mt-4">
//     <div className="text-2xl font-bold mb-4">Recent Orders</div>  
//     <div className="overflow-x-auto">
//       <Table columns={columns} dataSource={orderData?.length ? orderData : []} />
//     </div>
//   </div>
// </div>
  )
}

export default Dashboard