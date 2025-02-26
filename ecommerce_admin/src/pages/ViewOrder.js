import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleOrder, resetState } from '../features/auth/authSlice';

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
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  }
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const orderId = param.id;

  //Get order state
  const orderState = useSelector((state) => {
    return state?.auth?.singleOrder;
  });

  useEffect(() => {
    if(orderId) {
      dispatch(getSingleOrder(orderId));
    } else {
      dispatch(resetState());
    }
  }, [orderId]);

  // console.log(orderState);
  
  const dataTable = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    dataTable.push({
      key: i + 1,
      product: orderState?.orderItems[i]?.product?.title,
      brand: orderState?.orderItems[i]?.product?.brand,
      quantity: orderState?.orderItems[i]?.quantity,
      amount: orderState?.orderItems[i]?.price,
    });
  }

  const goback = () => {
    navigate(-1);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">View order</h3>
      <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' onClick={goback}>Go back</button>

      <div>
          <Table columns={columns} dataSource={dataTable} />
      </div>
    </div>
  )
}

export default ViewOrder