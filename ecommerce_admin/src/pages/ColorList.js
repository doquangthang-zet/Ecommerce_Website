import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColor, getColors } from '../features/color/colorSlice';
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

const ColorList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color.colors);

  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const removeColor = (id) => {
    dispatch(deleteColor(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  }

  const dataTable = [];
  for (let i = 0; i < colorState.length; i++) {
    dataTable.push({
      key: i + 1,
      title: colorState[i].title,
      actions: 
      <div className="flex items-center justify-center gap-5">
        <Link to={`/admin/color/${colorState[i]._id}`}>
          <FaEdit className='text-purple-500 text-xl' />
        </Link>
        <button onClick={() => showModal(colorState[i]._id)}>
          <MdDeleteForever className='text-red-500 text-xl' />
        </button>
      </div>
      ,
    });
  }

  return (
    <div>
        <h3 className="text-2xl font-bold mb-4">Colors</h3>

        <div>
            <Table columns={columns} dataSource={dataTable} />
        </div>

        <CustomModal title="Are you sure to delete this color?" hideModal={hideModal} open={open} performAction={() => removeColor(colorId)} />
    </div>
  )
}

export default ColorList