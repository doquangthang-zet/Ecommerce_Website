import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteBlogCategory, getbCategories } from '../features/blogCate/bCategorySlice';
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

const BlogCateList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getbCategories());
  }, []);

  const bCategoryState = useSelector((state) => state.bCategory.bCategories);

  const [open, setOpen] = useState(false);
  const [blogCateId, setBlogCateId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setBlogCateId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const removeBlogCate = (id) => {
    dispatch(deleteBlogCategory(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getbCategories());
    }, 100);
  }

  const dataTable = [];
  for (let i = 0; i < bCategoryState.length; i++) {
    dataTable.push({
      key: i + 1,
      title: bCategoryState[i].title,
      actions: 
      <div className="flex items-center justify-center gap-5">
        <Link to={`/admin/blog-category/${bCategoryState[i]._id}`}>
          <FaEdit className='text-purple-500 text-xl' />
        </Link>
        <button onClick={() => showModal(bCategoryState[i]._id)}>
          <MdDeleteForever className='text-red-500 text-xl' />
        </button>
      </div>
      ,
    });
  }

  return (
    <div>
        <h3 className="text-2xl font-bold mb-4">Blog Categories</h3>

        <div>
            <Table columns={columns} dataSource={dataTable} />
        </div>

        <CustomModal title="Are you sure to delete this blog category?" hideModal={hideModal} open={open} performAction={() => removeBlogCate(blogCateId)} />
    </div>
  )
}

export default BlogCateList