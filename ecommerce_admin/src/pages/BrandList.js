import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, deleteBrand } from '../features/brand/brandSlice';
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
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ];

const BrandList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);

  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const removeBrand = (id) => {
    dispatch(deleteBrand(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  }

  const dataTable = [];
  for (let i = 0; i < brandState.length; i++) {
    dataTable.push({
      key: i + 1,
      title: brandState[i].title,
      actions: 
      <div className="flex items-center justify-center gap-5">
        <Link to={`/admin/brand/${brandState[i]._id}`}>
          <FaEdit className='text-purple-500 text-xl' />
        </Link>
        <button onClick={() => showModal(brandState[i]._id)}>
          <MdDeleteForever className='text-red-500 text-xl' />
        </button>
      </div>
      ,
    });
  }

  return (
    <div>
        <h3 className="text-2xl font-bold mb-4">Brands</h3>

        <div>
            <Table columns={columns} dataSource={dataTable} />
        </div>

        <CustomModal title="Are you sure to delete this brand?" hideModal={hideModal} open={open} performAction={() => removeBrand(brandId)} />
    </div>
  )
}

export default BrandList