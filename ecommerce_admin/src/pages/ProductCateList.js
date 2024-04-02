import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories } from '../features/productCate/pCategorySlice';
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

const ProductCateList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoryState = useSelector((state) => state.category.categories);

  const [open, setOpen] = useState(false);
  const [cateId, setCateId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setCateId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const removeCate = (id) => {
    dispatch(deleteCategory(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  }

  const dataTable = [];
  for (let i = 0; i < categoryState.length; i++) {
    dataTable.push({
      key: i + 1,
      title: categoryState[i].title,
      actions: 
      <div className="flex items-center justify-center gap-5">
        <Link to={`/admin/category/${categoryState[i]._id}`}>
          <FaEdit className='text-purple-500 text-xl' />
        </Link>
        <button onClick={() => showModal(categoryState[i]._id)}>
          <MdDeleteForever className='text-red-500 text-xl' />
        </button>
      </div>
      ,
    });
  }

  return (
    <div>
        <h3 className="text-2xl font-bold mb-4">Product Categories</h3>

        <div>
            <Table columns={columns} dataSource={dataTable} />
        </div>

        <CustomModal title="Are you sure to delete this product category?" hideModal={hideModal} open={open} performAction={() => removeCate(cateId)} />
    </div>
  )
}

export default ProductCateList