// Dashboard.js
// src/components/Admin/adminDataTable.js
import React, { useState, useEffect } from 'react';
import { Table, Space, Button, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const AdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthToken = () => {
    return localStorage.getItem("token") || "";
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const token = getAuthToken();
    try {
      const response = await fetch("http://localhost:4000/v1/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - Please login again");
        }
        throw new Error("Failed to fetch admins");
      }

      const data = await response.json();
      setAdmins(data);
      setLoading(false);
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = getAuthToken();
    try {
      const response = await fetch(`http://localhost:4000/v1/admin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - Please login again");
        }
        throw new Error("Failed to delete admin");
      }

      message.success("Admin deleted successfully");
      fetchAdmins(); // Refresh the list
    } catch (error) {
      message.error(error.message);
    }
  };
  

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => console.log('Edit', record._id)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this admin?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={admins} 
      rowKey="_id" 
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default AdminTable;