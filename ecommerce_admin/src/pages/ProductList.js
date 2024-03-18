import React from 'react'
import { Table } from 'antd';

const columns = [
    {
      title: 'Sno',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  
  const dataTable = [];
  for (let i = 0; i < 46; i++) {
    dataTable.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      status: `London, Park Lane no. ${i}`,
    });
  }

const ProductList = () => {
  return (
    <div>
        <h3 className="text-2xl font-bold mb-4">Products</h3>

        <div>
            <Table columns={columns} dataSource={dataTable} />
        </div>
    </div>
  )
}

export default ProductList