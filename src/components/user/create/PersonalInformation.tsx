"use client";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectFields";
import {
  bloodGroupOptions,
  genderOptions,
  maritalStatusOptions,
} from "@/constants/selectOptions";
import { Col, Row } from "antd";
import React from "react";

const PersonalInformation = () => {
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
          marginBottom: "10px",
        }}
      >
        Basic Information
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
            name="profileData.personalInformation.age"
            size="large"
            label="age"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormSelectField
            size="large"
            name="profileData.personalInformation.bloodGroup"
            options={bloodGroupOptions}
            label="Blood group"
            placeholder="Select"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormSelectField
            size="large"
            name="profileData.personalInformation.gender"
            options={genderOptions}
            label="gender"
            placeholder="Select"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormSelectField
            size="large"
            name="profileData.personalInformation.maritalStatus"
            options={maritalStatusOptions}
            label="maritalStatus"
            placeholder="Select"
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
            name="profileData.personalInformation.nationality"
            size="large"
            label="Nationality"
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
            name="profileData.personalInformation.phoneNumber"
            size="large"
            label="Phone Number"
          />
        </Col>
      </Row>
    </div>
  );
};

export default PersonalInformation;
