"use client";
import { Alert, Button, Col, Row } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { USER_ROLE } from "@/constants/role";

const PUBLISH_POST = gql`
  mutation pub($postId: ID!) {
    publishedpost(postId: $postId) {
      message
      post {
        content
        title
        id
        isPublished
      }
    }
  }
`;

const PublishPost = ({ params }: any) => {
  const role = USER_ROLE.GQL_USER;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [publishedpost, { data, loading, error }] = useMutation(PUBLISH_POST);
  console.log(data);

  const onSubmit: SubmitHandler<any> = async () => {
    await publishedpost({
      variables: {
        postId: params.id,
      },
    });
  };

  useEffect(() => {
    if (data && data.publishedpost.post.isPublished === true) {
      window.alert(data.publishedpost.message);
      router.push(`/${role}/posts`);
    }
  }, [data]);

  return (
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
            Publish the Post
          </h1>
          <div
            style={{
              padding: "20px",
              border: "1px solid #eaeaea",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
    </Row>
  );
};

export default PublishPost;
