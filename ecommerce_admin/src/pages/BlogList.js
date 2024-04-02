import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlogs } from '../features/blog/blogSlice';
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
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
      sorter: (a, b) => a.likes - b.likes,
    },
    {
      title: 'Dislikes',
      dataIndex: 'dislikes',
      sorter: (a, b) => a.dislikes - b.dislikes,
    },
    {
      title: 'View Number',
      dataIndex: 'numview',
      sorter: (a, b) => a.numview - b.numview,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ];

const BlogList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const blogState = useSelector((state) => state.blog.blogs);

  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setBlogId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const removeBlog = (id) => {
    dispatch(deleteBlog(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  }

  const dataTable = [];
  for (let i = 0; i < blogState.length; i++) {
    dataTable.push({
      key: i + 1,
      title: blogState[i].title,
      category: blogState[i].category,
      likes: blogState[i].likes.length,
      dislikes: blogState[i].dislikes.length,
      numview: blogState[i].numViews,
      author: blogState[i].author,
      actions: 
      <div className="flex items-center justify-center gap-5">
        <Link to={`/admin/blog/${blogState[i]._id}`}>
          <FaEdit className='text-purple-500 text-xl' />
        </Link>
        <button onClick={() => showModal(blogState[i]._id)}>
          <MdDeleteForever className='text-red-500 text-xl' />
        </button>
      </div>
      ,
    });
  }

  return (
    <div>
        <h3 className="text-2xl font-bold mb-4">Blogs</h3>

        <div>
            <Table columns={columns} dataSource={dataTable} />
        </div>
        <CustomModal title="Are you sure to delete this blog?" hideModal={hideModal} open={open} performAction={() => removeBlog(blogId)} />
    </div>
  )
}

export default BlogList