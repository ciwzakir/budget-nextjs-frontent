"use client";
import React from "react";
import Form from "@/components/forms/Form";
import { Button, Col, Row, message } from "antd";
import FormDynamicFields from "@/components/forms/FormDynamicFields";

const CreateOfferedCourseSectionPage = () => {
  const onSubmit = async (data: any) => {
    message.loading("Creating.....");
  };

  return (
    <div>
      <h1>Create Offered Course Section</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={16} style={{ margin: "10px 0" }}>
            <FormDynamicFields />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateOfferedCourseSectionPage;
