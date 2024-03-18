import React from 'react'
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from '@ant-design/plots';
import { Table } from 'antd';


const data = [
  { type: 'Jan', value: 0.16 },
  { type: 'Feb', value: 0.125 },
  { type: 'Mar', value: 0.24 },
  { type: 'Apr', value: 0.19 },
  { type: 'May', value: 0.22 },
  { type: 'Jun', value: 0.05 },
  { type: 'Jul', value: 0.01 },
  { type: 'Aug', value: 0.015 },
  { type: 'Sep', value: 0.015 },
  { type: 'Oct', value: 0.015 },
  { type: 'Nov', value: 0.015 },
  { type: 'Dec', value: 0.015 },
];

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
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const dataTable = [];
for (let i = 0; i < 46; i++) {
  dataTable.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    style: {
      fill: ({ type }) => {
        return '#A855F7';
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        return (val * 100).toFixed(1) + '%';
      },
      offset: 10,
    },
    legend: false,
  };

  return (
    <div>
      <h3 className='text-2xl font-bold mb-4'>Dashboard</h3>

      {/* Total */}
      <div className='flex justify-between items-center gap-5'>
        <div className='flex flex-grow justify-between items-end bg-white p-3 rounded-md'>
          <div>
            <p className='text-lg font-medium mb-3'>Total</p>
            <h4 className='mb-0 text-xl font-semibold'>$1100</h4>
          </div>
          <div className='flex flex-col items-end'>
            <h6 className='text-base font-normal flex items-center gap-1 text-red-600'>
              <BsArrowDownRight /> 32%
            </h6>
            <p className='mb-0'>Compared to April 2023</p>
          </div>
        </div>
        <div className='flex flex-grow justify-between items-end bg-white p-3 rounded-md'>
          <div>
            <p className='text-lg font-medium mb-3'>Total</p>
            <h4 className='mb-0 text-xl font-semibold'>$1100</h4>
          </div>
          <div className='flex flex-col items-end'>
            <h6 className='text-base font-normal flex items-center gap-1 text-red-600'>
              <BsArrowDownRight /> 32%
            </h6>
            <p className='mb-0'>Compared to April 2023</p>
          </div>
        </div>
        <div className='flex flex-grow justify-between items-end bg-white p-3 rounded-md'>
          <div>
            <p className='text-lg font-medium mb-3'>Total</p>
            <h4 className='mb-0 text-xl font-semibold'>$1100</h4>
          </div>
          <div className='flex flex-col items-end'>
            <h6 className='text-base font-normal flex items-center gap-1 text-green-600'>
              <BsArrowUpRight /> 32%
            </h6>
            <p className='mb-0'>Compared to April 2023</p>
          </div>
        </div>
      </div>

      {/* Column chart */}
      <div className="mt-4">
        <h3 className="text-2xl font-bold mb-4">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-4">
        <div className="text-2xl font-bold mb-4">Recent Orders</div>  
        <div>
          <Table columns={columns} dataSource={dataTable} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard