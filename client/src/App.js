import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import SideBar from "./components/Sider/Sider";
import Roster from "./pages/RosterPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import AuthContext from "./authContext";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import CoursesList from "./components/Course/CoursesList";
import CourseDetails from "./components/Course/CourseDetails";
import LogOutSuccessPage from "./pages/LogoutSuccessPage";
import ProtectedRoute from './ProtectedRoute';
import UserProfile from "./components/User/userProfile";
import UserActivityMonitor from "./components/User/userActivityTracker";
import Logout from "./components/Login/Logout";
import AppFooter from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import Stats from "./pages/stats/StatsPage";
import AdminTable from "./pages/RosterPage";
import AdminSmsSender from "./pages/notifications";


const { Header } = Layout;
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <AuthContext.Provider
          value={{ isLoggedIn, setIsLoggedIn, handleLogout }}
        >
          <Router>
            {isLoggedIn && <SideBar collapsed={isSiderCollapsed} />}

            <Layout>
              {isLoggedIn && (
                <Header id="header">
                  <Button
                    icon={
                      isSiderCollapsed ? (
                        <MenuUnfoldOutlined />
                      ) : (
                        <MenuFoldOutlined />
                      )
                    }
                    onClick={() => setIsSiderCollapsed(!isSiderCollapsed)}
                    id="menu-trigger"
                  />
                    <Logout />
                </Header>
              )}

              {/* Pass the state to SideBar */}
              {/* Add a button to toggle the Sider */}
              {/* ... rest of your code ... */}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout-success" element={<LogOutSuccessPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route exact path="/courses" element={<ProtectedRoute><CoursesList /></ProtectedRoute>} />
                <Route path="/courses/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
                <Route path="/admins" element={<ProtectedRoute><AdminTable /></ProtectedRoute>} />
                <Route path="/userprofile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route path="/statistic" element={<ProtectedRoute><Stats /></ProtectedRoute>} />    
                <Route path="/notifications" element={<ProtectedRoute><AdminSmsSender /></ProtectedRoute>} />    
                <Route
                  path="/"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/roster" replace />
                    ) : (
                      <HomePage />
                    )
                  }
                />
                {/* route to home page if endpoint is not found */}
                <Route path="/" element={<HomePage />} />
              </Routes>
              {/* {isLoggedIn && <FloatingGroup />} */}
              {isLoggedIn && <UserActivityMonitor />}

              <AppFooter />
              
            </Layout>

          </Router>
        </AuthContext.Provider>
      </Layout>
    </div>
  );
};

export default App;
