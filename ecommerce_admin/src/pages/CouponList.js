import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoupon, getCoupon } from '../features/coupon/couponSlice';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CustomModal from '../components/CustomModal';

const columns = [
    {
      title: 'Sno',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Expiry date',
      dataIndex: 'exp',
      sorter: (a, b) => a.exp - b.exp,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ];

const CouponList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupon());
  }, []);

  const couponState = useSelector((state) => state.coupon.coupons);

  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const removeCoupon = (id) => {
    dispatch(deleteCoupon(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupon());
    }, 100);
  }

  const dataTable = [];
  for (let i = 0; i < couponState.length; i++) {
    dataTable.push({
      key: i + 1,
      name: couponState[i].name,
      exp: new Date(couponState[i].expiry).toLocaleString(),
      discount: couponState[i].discount,
      actions: 
      <div className="flex items-center justify-center gap-5">
        <Link to={`/admin/coupon/${couponState[i]._id}`}>
          <FaEdit className='text-purple-500 text-xl' />
        </Link>
        <button onClick={() => showModal(couponState[i]._id)}>
          <MdDeleteForever className='text-red-500 text-xl' />
        </button>
      </div>
      ,
    });
  }

  return (
    <div>
        <h3 className="text-2xl font-bold mb-4">Coupons</h3>

        <div>
            <Table columns={columns} dataSource={dataTable} />
        </div>

        <CustomModal title="Are you sure to delete this coupon?" hideModal={hideModal} open={open} performAction={() => removeCoupon(couponId)} />
    </div>
  )
}

export default CouponList