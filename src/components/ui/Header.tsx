"use client";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { getUserInfo, removeUserInfo } from "@/app/auth/auth.service";
const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();
  const { userRole: role } = getUserInfo() as any;
  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
    {
      key: "1",
      label: <Button type="text">{role}</Button>,
    },
    {
      key: "2",
      label: <Button type="text">Email</Button>,
    },
  ];

  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Row
        justify="end"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={16}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
