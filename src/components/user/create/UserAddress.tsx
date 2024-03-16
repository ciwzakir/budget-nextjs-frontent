"use client";
import FormInput from "@/components/forms/FormInput";
import { Col, Row } from "antd";
import React from "react";

const UserAddress = () => {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        padding: "15px",
        marginBottom: "10px",
      }}
    >
      <p
        style={{
          fontSize: "18px",
          marginBottom: "10px",
        }}
      >
        Address
      </p>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            type="text"
            name="profileData.userAddress.city"
            size="large"
            label="City"
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
            name="profileData.userAddress.street"
            size="large"
            label="Street"
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
            name="profileData.userAddress.zipCode"
            size="large"
            label="ZipCode"
          />
        </Col>
      </Row>
    </div>
  );
};

export default UserAddress;
