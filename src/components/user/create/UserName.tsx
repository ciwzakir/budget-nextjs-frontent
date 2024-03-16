"use client";
import FormInput from "@/components/forms/FormInput";
import { Col, Row } from "antd";

const UserName = () => {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        padding: "15px",
        marginBottom: "25px",
      }}
    >
      <p
        style={{
          fontSize: "18px",
          marginBottom: "20px",
        }}
      >
        Full Name
      </p>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "15px",
          }}
        >
          <FormInput
            type="text"
            name="profileData.userName.firstName"
            size="large"
            label="First Name"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            type="text"
            name="profileData.userName.middleName"
            size="large"
            label="Middle Name"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            type="text"
            name="profileData.userName.lastName"
            size="large"
            label="Last Name"
          />
        </Col>
      </Row>
    </div>
  );
};

export default UserName;
