"use client";
import { Button, Col, Row, message } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { USER_ROLE } from "@/constants/role";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GETSINGLEPOST, MYPROFILESFEATURES } from "@/app/graphl/query/query";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import FormSelectField, {
  SelectOptions,
} from "@/components/forms/FormSelectFields";
import { GETPOSTCATEGORIES } from "@/app/graphl/query/posts/posts";

const UPDATEPOST_GQL = gql`
  mutation updatePost($postId: ID!, $post: PostInput) {
    updatepost(postId: $postId, post: $post) {
      message
      post {
        id
        postCategory {
          id
          name
          description
        }
      }
    }
  }
`;

type Inputs = {
  title: string;
  content: string;
  categoryId: string;
};

const EditPost = ({ params }: any) => {
  const { id } = params;
  const postId = id;

  const { data: getSingleData } = useQuery(GETSINGLEPOST, {
    variables: { postId },
  });
  // console.log(getSingleData);
  const role = USER_ROLE.GQL_USER;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [updatepost, { data, loading, error }] = useMutation(UPDATEPOST_GQL, {
    refetchQueries: [{ query: MYPROFILESFEATURES }],
  });
  console.log("Get Dataaa", data);
  const { data: categories } = useQuery(GETPOSTCATEGORIES);
  // console.log(" Get Categories", Categories);

  const postCategoryOptions = categories?.postCategories?.map(
    (categoryElement: any) => {
      return {
        label: categoryElement?.name,
        value: categoryElement?.id,
      };
    }
  );

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    await updatepost({
      variables: {
        postId: id,
        post: {
          title: formData.title,
          content: formData.content,
          categoryId: formData.categoryId,
        },
      },
    });
  };

  useEffect(() => {
    if (data && data.updatepost) {
      message.success(data.updatepost.message);
      // window.alert(data.updatepost.message);
      router.push(`/${role}/posts`);
    }
  }, [data]);

  // @ts-ignore
  const defaultValues = {
    title: getSingleData?.post?.title || "",
    content: getSingleData?.post?.content || "",
    categoryId: getSingleData?.post?.postCategory?.id,
  };

  return (
    <div className="main">
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

      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
        }}
      >
        <Col sm={12} md={16} lg={10}></Col>
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
            >
              Update the Post ID : {id}
            </h1>
            <div>
              <Form submitHandler={onSubmit} defaultValues={defaultValues}>
                <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                  <Col span={8} style={{ margin: "10px 0" }}>
                    <FormInput name="title" label="Title" />
                    <FormInput name="content" label="Content" />
                    <FormSelectField
                      size="large"
                      name="categoryId"
                      options={postCategoryOptions as SelectOptions[]}
                      label="Post Category"
                      placeholder="Select"
                    />
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EditPost;
