// Header.js
import "./Sider.css";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import AuthContext from "../../authContext";
import {
  ApartmentOutlined,
  PieChartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons"; // Import the icons

const { Sider } = Layout;

const SideBar = ({ collapsed }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const items = [];

  if (isLoggedIn) {
    items.push(
      {
        label: <Link to="/statistic">Overview</Link>,
        key: "statistic",
        icon: <PieChartOutlined />,
      },
      {
        label: <Link to="/admins">Admins</Link>,
        key: "admins",
        icon: <UnorderedListOutlined />,
      },
      {
        label: <Link to="/courses">Courses</Link>,
        key: "courses",
        icon: <ApartmentOutlined />,
      },

      {
        label: <Link to="/userprofile">User Profile</Link>,
        key: "userprofile",
        icon: <UserOutlined />,
      },
      {
        label: <Link to="/notifications">notification</Link>,
        key: "notification",
        icon: <UserOutlined />,
      }
    );
  }

  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <Sider id="sider" collapsible collapsed={collapsed} trigger={null}>
        <div className="demo-logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          items={items}
          className="main-menu"
        />
      </Sider>
    </>
  );
};

export default SideBar;
