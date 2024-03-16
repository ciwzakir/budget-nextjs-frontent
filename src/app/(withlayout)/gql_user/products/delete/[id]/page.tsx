"use client";
import { getUserInfo } from "@/app/auth/auth.service";
import { DELETETEPRODUCT } from "@/app/graphl/mutations/products/products";
import { MYPROFILESFEATURES } from "@/app/graphl/query/query";
import { useMutation } from "@apollo/client";
import { Button, Col, Modal, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { userRole: role } = getUserInfo() as any;

const DeleteProductPage = ({ params }: any) => {
  const { id } = params;
  const [deleteproduct, { data, loading, error }] = useMutation(
    DELETETEPRODUCT,
    {
      refetchQueries: [{ query: MYPROFILESFEATURES }],
    }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const deleteHandler = async () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await deleteproduct({
      variables: {
        productId: id,
      },
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    router.push(`/${role}/products/views`);
  };

  useEffect(() => {
    if (data && data.deleteproduct) {
      message.success(data.deleteproduct.message);
      router.push(`/${role}/products/views`);
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
          <p>Are you sure you want to delete ?</p>
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

export default DeleteProductPage;
