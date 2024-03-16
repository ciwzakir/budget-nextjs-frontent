"use client";

import { DELETEPOST_GQL } from "@/app/graphl/mutations/muttion";
import { MYPROFILESFEATURES } from "@/app/graphl/query/query";
import { USER_ROLE } from "@/constants/role";

import { useMutation } from "@apollo/client";
import { Button, Col, Modal, Row } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeletePost = ({ params }: any) => {
  const { id } = params;
  const [deletepost, { data, loading, error }] = useMutation(DELETEPOST_GQL, {
    refetchQueries: [{ query: MYPROFILESFEATURES }],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const deleteHandler = async () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await deletepost({
      variables: {
        postId: id,
      },
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    router.push(`/${USER_ROLE.GQL_USER}/posts`);
  };

  useEffect(() => {
    if (data && data.deletepost) {
      // You can handle success message or redirect here
      // message.success(data.deletepost.message);
      router.push(`/${USER_ROLE.GQL_USER}/posts`);
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
      <Col sm={12} md={16} lg={10}>
        <Modal
          title="Deletion Confirmation"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure you want to delete this post?</p>
        </Modal>
      </Col>
      <Col sm={12} md={8} lg={8}>
        <div>
          <div>
            <Button type="primary" onClick={deleteHandler}>
              Delete Now
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DeletePost;
