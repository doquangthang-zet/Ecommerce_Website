import React, { useEffect } from 'react'
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../features/auth/authSlice';

const columns = [
    {
      title: 'Sno',
      dataIndex: 'key',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      sorter: (a, b) => a.product.length - b.product.length,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      sorter: (a, b) => a.customer.length - b.customer.length,
    },
    {
      title: 'Order Date',
      dataIndex: 'date',
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ];

const Order = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  const orderState = useSelector((state) => state.auth.orders);

  const dataTable = [];
  for (let i = 0; i < orderState.length; i++) {
    dataTable.push({
      key: i + 1,
      product: orderState[i].products.map((i,idx, arr) => `${i.product.title}${idx !== (arr.length - 1) ? ", " : ""}`),
      customer: orderState[i].orderBy.firstname + " " + orderState[i].orderBy.lastname,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      amount: orderState[i].paymentIntent.amount,
      status: orderState[i].orderStatus,
      actions: 
      <div className="flex items-center justify-center gap-5">
        <Link>
          <FaEdit className='text-purple-500 text-xl' />
        </Link>
        <Link>
          <MdDeleteForever className='text-red-500 text-xl' />
        </Link>
      </div>
      ,
    });
  }


  return (
    <div>
        <h3 className="text-2xl font-bold mb-4">Orders</h3>

        <div>
            <Table columns={columns} dataSource={dataTable} />
        </div>
    </div>
    
  )
}

export default Order