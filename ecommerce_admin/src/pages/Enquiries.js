import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteEnquiry, getEnquiries } from '../features/enquiry/enquirySlice';
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

  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setEnquiryId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const removeEnquiry = (id) => {
    dispatch(deleteEnquiry(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  }

  const dataTable = [];
  for (let i = 0; i < enquiryState.length; i++) {
    dataTable.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: enquiryState[i].status,
      actions: 
      <div className="flex items-center justify-center gap-5">
        <Link to={`/admin/enquiries/${enquiryState[i]._id}`}>
          <FaRegEye className='text-purple-500 text-xl' />
        </Link>
        <button onClick={() => showModal(enquiryState[i]._id)}>
          <MdDeleteForever className='text-red-500 text-xl' />
        </button>
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

        <CustomModal title="Are you sure to delete this enquiry?" hideModal={hideModal} open={open} performAction={() => removeEnquiry(enquiryId)} />
    </div>
  )
}

export default Enquiries