import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts, resetState } from '../features/product/productSlice';
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
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ];

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);

  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const removeProduct = (id) => {
    dispatch(deleteProduct(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  }

  const dataTable = [];
  for (let i = 0; i < productState.length; i++) {
    dataTable.push({
      key: i + 1,
      title: productState[i].title,
      price: productState[i].price,
      category: productState[i].category,
      brand: productState[i].brand,
      quantity: productState[i].quantity,
      color:
      <div className='flex'>
        {productState[i].color.map((color) => (
          <div key={color._id}>{color.title}, </div>
        ))}
      </div> ,
      sold: productState[i].sold,
      actions: 
      <div className="flex items-center justify-center gap-1">
        <Link to={`/admin/product/${productState[i]._id}`}>
          <FaEdit className='text-purple-500 text-xl' />
        </Link>
        <button onClick={() => showModal(productState[i]._id)}>
          <MdDeleteForever className='text-red-500 text-xl' />
        </button>
      </div>
      ,
    });
  }

  return (
    <div>
        <h3 className="text-2xl font-bold mb-4">Products</h3>

        <div>
            <Table columns={columns} dataSource={dataTable} />
        </div>
        <CustomModal title="Are you sure to delete this product?" hideModal={hideModal} open={open} performAction={() => removeProduct(productId)} />
    </div>
  )
}

export default ProductList