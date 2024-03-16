"use client";
import { useRouter } from "next/navigation";

import { LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { removeUserInfo } from "@/app/auth/auth.service";

const LogoutPage = () => {
  const router = useRouter();
  const handleLogout = () => {
    // localStorage.removeItem("token");
    removeUserInfo("token");
    router.push("/register");
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          Log In
        </h1>
        <div>
          <Button type="primary" onClick={handleLogout}>
            <LogoutOutlined />
            Log Out
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default LogoutPage;
