"use client";
import FormDynamicFields from "@/components/forms/FormDynamicFields";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectFields";
import {
  fieldOfStudyOptions,
  graduationYearOptions,
  obtainGradeOptions,
  qualificationOptions,
} from "@/constants/selectOptions";
import { Col, Row } from "antd";
import React from "react";

const EducationQualifications = () => {
  return (
    // <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
    //   <Col
    //     className="gutter-row"
    //     span={8}
    //     style={{
    //       marginBottom: "10px",
    //     }}
    //   >
    //     <FormSelectField
    //       size="large"
    //       name={`profileData.educationQualifications.qualification`}
    //       options={qualificationOptions}
    //       label="Qualification"
    //       placeholder="Select"
    //     />
    //   </Col>
    //   <Col
    //     className="gutter-row"
    //     span={8}
    //     style={{
    //       marginBottom: "10px",
    //     }}
    //   >
    //     <FormSelectField
    //       size="large"
    //       name={`profileData.educationQualifications.fieldOfStudy`}
    //       options={fieldOfStudyOptions}
    //       label="FieldOfStudy"
    //       placeholder="Select"
    //     />
    //   </Col>
    //   <Col
    //     className="gutter-row"
    //     span={8}
    //     style={{
    //       marginBottom: "10px",
    //     }}
    //   >
    //     <FormInput
    //       type="text"
    //       name={`profileData.educationQualifications.instituteName`}
    //       size="large"
    //       label="InstituteName"
    //     />
    //   </Col>
    //   <Col
    //     className="gutter-row"
    //     span={8}
    //     style={{
    //       marginBottom: "10px",
    //     }}
    //   >
    //     <FormSelectField
    //       size="large"
    //       name={`profileData.educationQualifications.graduationYear`}
    //       options={graduationYearOptions}
    //       label="Passing Year"
    //       placeholder="Select"
    //     />
    //   </Col>
    //   <Col
    //     className="gutter-row"
    //     span={8}
    //     style={{
    //       marginBottom: "10px",
    //     }}
    //   >
    //     <FormSelectField
    //       size="large"
    //       name={`profileData.educationQualifications.obtainGrade`}
    //       options={obtainGradeOptions}
    //       label="ObtainGrade"
    //       placeholder="Select"
    //     />
    //   </Col>
    // </Row>
    <>
      <h1>jjjj</h1>
      <FormDynamicFields></FormDynamicFields>
    </>
  );
};

export default EducationQualifications;
