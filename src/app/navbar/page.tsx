"use client";
import { Layout, Menu } from "antd";
import Link from "next/link";

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link href="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/login">Login</Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link href="/student">Student Dashboard</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
