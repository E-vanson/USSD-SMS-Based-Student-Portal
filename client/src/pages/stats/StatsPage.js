// StatsPage.js
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

import { Statistic, Row, Col, Card, Layout, message, Typography, Form,Modal,Input,Select,  Table, Button } from "antd";
import '../stats/statsPage.css';
const { Content } = Layout;
const { Title, Text } = Typography;
const formatter = (value) => <CountUp end={value} separator="," />;

const StatsPage = () => {
  const [stats, setStats] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [courses, setCourses] = useState([])

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Course",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Reg No",
      dataIndex: "regNo",
      key: "regNo",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div className="action-buttons">
          <Button type="primary" size="small">
            Edit
          </Button>
          <Button danger size="small">
            Delete
          </Button>
        </div>
      ),
    },
  ];

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const statsResponse = await fetch(
        "http://localhost:4000/v1/admin/getStats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const studentsResponse = await fetch(
        "http://localhost:4000/v1/student",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

       const coursesResponse = await fetch(
         "http://localhost:4000/v1/course",
         {
           headers: { Authorization: `Bearer ${token}` },
         }
       );

      if (!statsResponse.ok) {
        throw new Error("HTTP error!");
      }

      if (!coursesResponse.ok) {
        throw new Error("HTTP error!");
      }

      const statsData = await statsResponse.json();
      const studentsData = await studentsResponse.json();
      const courses = await coursesResponse.json();
      console.log("Courses: ", courses) 
      setCourses(courses);
      console.log(statsData, "The stats data")

      setStats(statsData);
      setStudents(studentsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
  
  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);

      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/v1/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,          
          notifications: [],
        }),
      });

      if (!response.ok) throw new Error("Failed to create student");

      message.success("Student created successfully");
      const newStudents = await fetchStudents(token);
      setStudents(newStudents);
      handleCancel();
    } catch (error) {
      message.error(error.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  const fetchStudents = async (token) => {
    const response = await fetch("http://localhost:4000/v1/student", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  };

  return (
    <div className="content">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Title level={4}>Statistics</Title>
            <Text type="secondary">System Overview</Text>
          </div>
          <Button type="primary" onClick={showModal}>
            Add Student
          </Button>
        </div>

        <div className="mt-2">
          <Row gutter={[16, 16]}>
            {/* Existing Cards */}
            <Col span={6}>
              <Card className="stats-card">
                <Statistic
                  title="Total students"
                  value={stats.students}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card className="stats-card">
                <Statistic
                  title="Total Admins"
                  value={stats.admins}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card className="stats-card">
                <Statistic
                  title="Total Courses"
                  value={stats.courses}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card className="stats-card">
                <Statistic
                  title="Total Units"
                  value={stats.units}
                  formatter={formatter}
                />
              </Card>
            </Col>
          </Row>
        </div>

        <Modal
          title="Create New Student"
          visible={isModalVisible}
          onOk={handleCreate}
          onCancel={handleCancel}
          confirmLoading={confirmLoading}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Please input full name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input email!" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input password!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNo"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Registration Number"
              name="regNo"
              rules={[
                {
                  required: true,
                  message: "Please input registration number!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Course"
              name="course"
              rules={[{ required: true, message: "Please select course!" }]}
            >
              <Select placeholder="Select course" loading={!courses.length}>
                {courses.map((course) => (
                  <Option key={course._id} value={course._id}>
                    {course.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>           
          </Form>
        </Modal>

        {/* Student Table */}
        <div className="stats-table">
          <Table
            columns={columns}
            dataSource={students}
            loading={loading}
            pagination={{ pageSize: 5 }}
            rowKey="regNo"
            scroll={{ x: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
