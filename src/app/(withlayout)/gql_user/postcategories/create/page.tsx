"use client";
import { Button, Col, Row, message } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { USER_ROLE } from "@/constants/role";
import { GETPOSTCATEGORIES } from "@/app/graphl/query/posts/posts";

const ADD_NEW_CAT = gql`
  mutation addNewCat($inputs: PostCategoryPayload) {
    createPostCategory(inputs: $inputs) {
      message
      categoryInfo {
        id
        name
        description
      }
    }
  }
`;

type InputData = {
  name: string;
  description: string;
};

const AddCategories = () => {
  const [createPostCategory, { data, loading, error }] = useMutation(
    ADD_NEW_CAT,
    {
      refetchQueries: [{ query: GETPOSTCATEGORIES }],
    }
  );
  const role = USER_ROLE.GQL_USER;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputData>();

  const onSubmit: SubmitHandler<InputData> = async (formData) => {
    await createPostCategory({
      variables: {
        inputs: {
          name: formData.name,
          description: formData.description,
        },
      },
    });
  };

  useEffect(() => {
    if (data && data.createPostCategory) {
      message.success(data.createPostCategory.message);
      router.push(`/${role}/posts`);
    }
  }, [data]);

  return (
    <div className="main" style={{ margin: "50px" }}>
      <div className="" style={{ marginBottom: "30px" }}>
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
              label: "Create Post",
              link: `/${role}/posts/create`,
            },
          ]}
        />
      </div>

      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
        }}
      >
        <Col sm={12} md={8} lg={8}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100%",
            }}
          >
            <h1
              style={{
                margin: "15px 0px",
                textAlign: "center",
              }}
            ></h1>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                  <Col span={8} style={{ margin: "10px 0" }}>
                    <input
                      placeholder="Name"
                      type="text"
                      {...register("name", { required: true })}
                      style={{
                        margin: "10px 0",
                        padding: "8px",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    />
                    <input
                      placeholder="Description"
                      type="text"
                      {...register("description", { required: true })}
                      style={{
                        margin: "10px 0",
                        padding: "8px",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    />
                  </Col>
                </Row>
                <button
                  type="submit"
                  style={{
                    margin: "15px 0",
                    padding: "10px",
                    backgroundColor: "#1890ff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </Col>
        <Col sm={12} md={16} lg={10}></Col>
      </Row>
    </div>
  );
};

export default AddCategories;
