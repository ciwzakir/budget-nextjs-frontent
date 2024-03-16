"use client";

import { getUserInfo } from "@/app/auth/auth.service";
import { CREATESUPPLIERS } from "@/app/graphl/mutations/products/suppliers";
import { GETPRODUCTSUPPLIER } from "@/app/graphl/query/products/supplier";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useMutation } from "@apollo/client";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type InputData = {
  name: string;
  description: string;
};
const { userRole: role } = getUserInfo() as any;

const AddProductBrand = () => {
  const router = useRouter();
  const [createProductSupplier, { data, loading, error }] = useMutation(
    CREATESUPPLIERS,
    {
      refetchQueries: [{ query: GETPRODUCTSUPPLIER }],
    }
  );

  const handleOnSubmit = async (formData: InputData) => {
    await createProductSupplier({
      variables: {
        inputs: {
          name: formData.name,
          description: formData.description,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      // console.log(data);
      message.success(data.createProductSupplier.message);
      router.push(`/${role}/products/suppliers`);
    }
  }, [data]);

  return (
    <>
      <div className="main" style={{ margin: "20px 25px" }}>
        <div className="breadecumb">
          <UMBreadCrumb
            items={[
              {
                label: "Profile",
                link: `/${role}/myprofile`,
              },

              {
                label: "Brands update",
                link: `/${role}/products/suppliers/update`,
              },
              {
                label: "Brands Delete",
                link: `/${role}/products/suppliers/delete`,
              },
            ]}
          />
        </div>

        <div className="content" style={{ margin: "30px 0" }}>
          <Form submitHandler={handleOnSubmit}>
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
                  name="name"
                  size="large"
                  label="Product supplier Name"
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
                  name="description"
                  size="large"
                  label="About supplier "
                />
              </Col>
            </Row>

            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddProductBrand;
