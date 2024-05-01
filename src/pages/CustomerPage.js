import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';

const CustomerPage = () => {
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();

  const getAllBills = async () => {
    try {
      dispatch({ type: 'SHOW_LOADING' });
      const { data } = await axios.get('https://pos-zd0e.onrender.com/api/bills/get-bills');
      setBillsData(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: 'HIDE_LOADING' });
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: '_id' },
    { title: 'Customer Name', dataIndex: 'customerName' },
    { title: 'Contact No', dataIndex: 'customerNumber' },
  ];

  // Map billsData to the required format
  const dataSource = billsData.map((bill) => ({
    key: bill._id, // Assuming _id is unique
    _id: bill._id,
    customerName: bill.customerName,
    customerNumber: bill.customerNumber,
  }));

  return (
    <DefaultLayout>
      <h1>CustomerPage</h1>
      <Table columns={columns} dataSource={dataSource} bordered pagination={false} />
    </DefaultLayout>
  );
};

export default CustomerPage;
