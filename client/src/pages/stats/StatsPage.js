// StatsPage.js
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

import { Statistic, Row, Col, Card, Layout, Typography, Table, Button } from "antd";
import '../stats/statsPage.css';
const { Content } = Layout;
const { Title, Text } = Typography;
const formatter = (value) => <CountUp end={value} separator="," />;

const StatsPage = () => {
  const [stats, setStats] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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
      dataIndex: "course",
      key: "course",
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await fetch("http://localhost:4000/v1/admin/getStats", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setStats(data);
  //     } catch (error) {
  //       console.error("Error fetching stats:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
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

      if (!statsResponse.ok) {
        throw new Error("HTTP error!");
      }

      const statsData = await statsResponse.json();
      const studentsData = await studentsResponse.json();
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

  return (
    // <Content className="content">
    //   <div>
    //     <Title level={4}>Statistic</Title>
    //     <Text type="secondary">Simple stats</Text>
    //     <div className="mt-2">
    //     <Row gutter={[16,16]}>
    //       <Col span={4}>
    //         <Card bordered={false}>
    //           <Statistic
    //             title="Total students"
    //             value={stats.students}
    //             formatter={formatter}
    //           />
    //         </Card>
    //       </Col>
    //       <Col>
    //         <Card bordered={false}>
    //           <Statistic
    //             title="Total Courses"
    //             value={stats.courses}
    //             formatter={formatter}
    //           />
    //         </Card>
    //       </Col>
    //       <Col>
    //         <Card bordered={false}>
    //           <Statistic
    //             title="Total Admins"
    //             value={stats.admins}
    //             formatter={formatter}
    //           />
    //         </Card>
    //       </Col>
    //       <Col>
    //         <Card bordered={false}>
    //           <Statistic
    //             title="No of Units"
    //             value={stats.units}
    //             formatter={formatter}
    //           />
    //         </Card>
    //       </Col>
    //     </Row>
    //     </div>
    //   </div>
    // </Content>
    <div className="content">
      <div>
        <Title level={4}>Statistics</Title>
        <Text type="secondary">System Overview</Text>

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
// const StatsPage = () => {
//   const [stats, setStats] = useState({});
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const columns = [
//     {
//       title: "Full Name",
//       dataIndex: "fullName",
//       key: "fullName",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Phone No",
//       dataIndex: "phoneNo",
//       key: "phoneNo",
//     },
//     {
//       title: "Course",
//       dataIndex: "course",
//       key: "course",
//     },
//     {
//       title: "Reg No",
//       dataIndex: "regNo",
//       key: "regNo",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: () => (
//         <div className="action-buttons">
//           <Button type="primary" size="small">
//             Edit
//           </Button>
//           <Button danger size="small">
//             Delete
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const statsResponse = await fetch(
//           "http://localhost:4000/v1/admin/getStats",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const studentsResponse = await fetch(
//           "http://localhost:4000/v1/students",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (!statsResponse.ok || !studentsResponse.ok) {
//           throw new Error("HTTP error!");
//         }

//         const statsData = await statsResponse.json();
//         const studentsData = await studentsResponse.json();

//         setStats(statsData);
//         setStudents(studentsData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="content">
//       <div>
//         <Title level={4}>Statistics</Title>
//         <Text type="secondary">System Overview</Text>

//         <div className="mt-2">
//           <Row gutter={[16, 16]}>
//             {/* Existing Cards */}
//             <Col span={6}>
//               <Card className="stats-card">
//                 <Statistic
//                   title="Total students"
//                   value={stats.students}
//                   formatter={formatter}
//                 />
//               </Card>
//             </Col>
//             {/* Other Card Cols... */}
//           </Row>
//         </div>

//         {/* Student Table */}
//         <div className="stats-table">
//           <Table
//             columns={columns}
//             dataSource={students}
//             loading={loading}
//             pagination={{ pageSize: 5 }}
//             rowKey="regNo"
//             scroll={{ x: true }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

export default StatsPage;
