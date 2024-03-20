import React, { useEffect } from 'react'
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getEnquiries } from '../features/enquiry/enquirySlice';

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
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      sorter: (a, b) => a.comment.length - b.comment.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ];

const Enquiries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const dataTable = [];
  for (let i = 0; i < enquiryState.length; i++) {
    dataTable.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: 
      <div>
        <select className='py-3 pl-2 mb-4 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'>
          <option value="">Set Status</option>
        </select>
      </div>,
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
        <h3 className="text-2xl font-bold mb-4">Enquiries</h3>

        <div>
            <Table columns={columns} dataSource={dataTable} />
        </div>
    </div>
  )
}

export default Enquiries