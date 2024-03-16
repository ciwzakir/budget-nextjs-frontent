"use client";

import { Button, Col, Empty, Row } from "antd";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormSelectField from "./FormSelectFields";
import {
  fieldOfStudyOptions,
  graduationYearOptions,
  obtainGradeOptions,
  qualificationOptions,
} from "@/constants/selectOptions";
import FormInput from "./FormInput";

const FormDynamicFields = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "profileData.educationQualifications",
  });

  return (
    <>
      <div>
        {fields.length > 0 ? (
          fields.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  marginBottom: "5px",
                  padding: "20px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                }}
              >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormSelectField
                      size="large"
                      name={`profileData.educationQualifications.${index}.qualification`}
                      options={qualificationOptions}
                      label="Qualification"
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
                      name={`profileData.educationQualifications.${index}.fieldOfStudy`}
                      options={fieldOfStudyOptions}
                      label="FieldOfStudy"
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
                      name={`profileData.educationQualifications.${index}.instituteName`}
                      size="large"
                      label="InstituteName"
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
                      name={`profileData.educationQualifications.${index}.graduationYear`}
                      options={graduationYearOptions}
                      label="Passing Year"
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
                      name={`profileData.educationQualifications.${index}.obtainGrade`}
                      options={obtainGradeOptions}
                      label="ObtainGrade"
                      placeholder="Select"
                    />
                  </Col>
                </Row>

                <Button
                  type="primary"
                  onClick={() => remove(index)}
                  danger
                  style={{ margin: "5px 0px" }}
                >
                  Delete
                </Button>
              </div>
            );
          })
        ) : (
          <Empty description="Not found" />
        )}
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Button type="primary" onClick={() => append(undefined)}>
          Add More
        </Button>
      </div>
    </>
  );
};

export default FormDynamicFields;
