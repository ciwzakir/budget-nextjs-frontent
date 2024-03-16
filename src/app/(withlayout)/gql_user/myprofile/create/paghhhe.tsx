"use client";
import { CREATE_PROFILE_GQL } from "@/app/graphl/mutations/muttion";
import FormInput from "@/components/forms/FormInput";
import { USER_ROLE } from "@/constants/role";
import { useMutation } from "@apollo/client";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import Form from "@/components/forms/Form";
import { useEffect } from "react";

const CreateProfilePage = () => {
  const router = useRouter();
  const role = USER_ROLE.GQL_USER;
  const [createprofile, { data, loading, error }] =
    useMutation(CREATE_PROFILE_GQL);

  const handleOnSubmit = async (formData: any) => {
    await createprofile({
      variables: {
        profileData: {
          userName: {
            firstName: formData.userName.firstName,
            middleName: formData.userName.middleName,
            lastName: formData.userName.lastName,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      message.success(data.createprofile.message);
      router.push(`/${role}/myprofile/create`);
    }
  }, [data]);

  return (
    <Form submitHandler={handleOnSubmit}>
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
            name="userName.firstName"
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
            name="userName.middleName"
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
            name="userName.lastName"
            size="large"
            label="Last Name"
          />
        </Col>
      </Row>

      <Button htmlType="submit" type="primary">
        Create
      </Button>
    </Form>
  );
};

export default CreateProfilePage;
