"use client";
import React, { Suspense, useState } from "react";
import { Layout, Menu } from "antd";
import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/app/auth/auth.service";
import Loading from "@/app/loader";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { userRole: role } = getUserInfo() as any;

  // const role = USER_ROLE.GQL_USER;
  // const role = USER_ROLE.SUPER_ADMIN;
  if (!!role) {
    console.log("userRole: role ", getUserInfo() as any);
  }
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Dashboard
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        // items={sidebarItems(userRole)}
        // @ts-expect-error
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default SideBar;
