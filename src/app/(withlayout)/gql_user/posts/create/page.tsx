"use client";
import FormInput from "@/components/forms/FormInput";
import { gql, useMutation } from "@apollo/client";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { USER_ROLE } from "@/constants/role";
import { MYPROFILESFEATURES } from "@/app/graphl/query/query";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Form from "@/components/forms/Form";

import FormSelectField, {
  SelectOptions,
} from "@/components/forms/FormSelectFields";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { GETPOSTCATEGORIES } from "@/app/graphl/query/posts/posts";
import { ADD_POST } from "@/app/graphl/mutations/posts/posts";
import {
  initialValuesOfCreatePost,
  postCreateSchema,
} from "@/validatorsSchema/posts/create";
import { yupResolver } from "@hookform/resolvers/yup";

const CreatePost = () => {
  const router = useRouter();
  const role = USER_ROLE.GQL_USER;
  const [addpost, { data, loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: MYPROFILESFEATURES }],
  });
  const { data: categories } = useQuery(GETPOSTCATEGORIES);

  const postCategoryOptions = categories?.postCategories?.map(
    (categoryElement: any) => {
      return {
        label: categoryElement?.name,
        value: categoryElement?.id,
      };
    }
  );

  const handleOnSubmit = async (formData: any) => {
    await addpost({
      variables: {
        post: {
          title: formData.title,
          content: formData.content,
          categoryId: formData.categoryId,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      // console.log(data);
      message.success(data.addpost.message);
      router.push(`/${role}/posts`);
    }
  }, [data]);

  return (
    <>
      <div className="mainDiv" style={{ margin: "50px" }}>
        <div className="" style={{ marginBottom: "30px" }}>
          <UMBreadCrumb
            items={[
              {
                label: "Create Post",
                link: `/${role}/posts`,
              },
              {
                label: "Edit Post",
                link: `/${role}/posts/edit/${data?.id}`,
              },
            ]}
          />
        </div>
        <Form
          submitHandler={handleOnSubmit}
          resolver={yupResolver(postCreateSchema)}
          defaultValues={initialValuesOfCreatePost}
        >
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
                name="title"
                size="large"
                label="Post title"
                required
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
                name="content"
                size="large"
                label="Post content"
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
                name="categoryId"
                options={postCategoryOptions as SelectOptions[]}
                label="Post Category"
                placeholder="Select"
              />
            </Col>
          </Row>

          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreatePost;
