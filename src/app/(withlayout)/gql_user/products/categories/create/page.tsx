"use client";

import { getUserInfo } from "@/app/auth/auth.service";
import { CREATEPRODUCTCATEGORY } from "@/app/graphl/mutations/products/productsCat";
import { GETPRODUCTSCATEGORIES } from "@/app/graphl/query/products/productCategory";
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

const AddProductCategories = () => {
  const router = useRouter();
  const [createProductCategory, { data, loading, error }] = useMutation(
    CREATEPRODUCTCATEGORY,
    {
      refetchQueries: [{ query: GETPRODUCTSCATEGORIES }],
    }
  );

  const handleOnSubmit = async (formData: InputData) => {
    await createProductCategory({
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
      message.success(data.createProductCategory.message);
      router.push(`/${role}/products/categories`);
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
                label: "Posts",
                link: `/${role}/posts`,
              },
              {
                label: "Categories",
                link: `/${role}/products/categories`,
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
                  label="Product Name"
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
                  label="Product Description"
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

export default AddProductCategories;
