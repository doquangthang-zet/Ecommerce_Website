import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

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

  const dataTable = [];
  for (let i = 0; i < brandState.length; i++) {
    dataTable.push({
      key: i + 1,
      title: brandState[i].title,
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
        <h3 className="text-2xl font-bold mb-4">Brands</h3>

        <div>
            <Table columns={columns} dataSource={dataTable} />
        </div>
    </div>
  )
}

export default BrandList