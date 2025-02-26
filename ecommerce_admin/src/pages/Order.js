import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getOrder, resetState, updateOrder } from '../features/auth/authSlice';

const columns = [
    {
      title: 'Sno',
      dataIndex: 'key',
    },
    {
      title: 'Product count',
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
  const navigate = useNavigate();
  const orderState = useSelector((state) => state.auth.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const dataTable = [];
  for (let i = 0; i < orderState?.length; i++) {
    dataTable.push({
      key: i + 1,
      product: <div className="flex items-center justify-center gap-5">
      <Link to={`/admin/orders/${orderState[i]?._id}`} className='text-blue-500 hover:underline text-center'>
        View items
      </Link>
    </div>,
      customer: orderState[i]?.user?.firstname + " " + orderState[i].user?.lastname,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      amount: orderState[i]?.totalPrice,
      status: orderState[i]?.orderStatus,
      actions: 
      <select 
        name="status" 
        id="status" 
        className='py-3 pl-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
        onChange={(e) => setOrderStatus(e.target.value, orderState[i]?._id)}
        value={orderState[i]?.orderStatus}
      >
        <option value="Ordered" disabled>Ordered</option>
        <option value="Progressed">In Progress</option>
        <option value="Shipped">Shipped</option>
        <option value="Out for delivery">Out for delivery</option>
        <option value="Delivered">Delivered</option>
      </select>
      ,
    });
  }

const setOrderStatus = (e, id) =>  {
    const orderData = {
        id: id,
        status: e,
    }

    dispatch(updateOrder(orderData));

    setTimeout(() => {
        dispatch(resetState());
        // navigate("/admin/orders");
        window.location.reload();  // for reloading the page after updating order status
    },1000);
  };

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