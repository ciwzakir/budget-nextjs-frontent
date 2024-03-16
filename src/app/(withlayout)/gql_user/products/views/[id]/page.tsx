"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row, Spin, message } from "antd";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GETSINGLEPRODUCT } from "@/app/graphl/query/products/product";
import Meta from "antd/es/card/Meta";
import Image from "next/image";

const SingleProduct = ({ params }: any) => {
  const productId = params.id;

  const { loading, error, data } = useQuery(GETSINGLEPRODUCT, {
    variables: { productId },
  });
  console.log(data);
  if (loading) {
    return <Spin />;
  } else if (error) {
    return message.error("Something wrong");
  } else {
    message.success("Successful");
  }
  console.log(data);
  return (
    <div className="main" style={{ margin: "50px", fontSize: "22px" }}>
      <Suspense fallback={<Spin />}>
        <Card
          style={{ width: 600 }}
          cover={
            <Image alt="example" src={data?.singleProduct?.productImageUrl} />
          }
          actions={[
            <SettingOutlined key="proceed to " />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src={data?.singleProduct?.productImageUrl} />}
            title={
              data?.product?.title
              //  data?.product?.id
            }
            description={data?.singleProduct?.description}
          />
          <ul>
            <li> Price {data?.singleProduct?.price}</li>
            <li>Discount {data?.singleProduct?.discount}</li>
            <li>color {data?.singleProduct?.color}</li>
            <li>size {data?.singleProduct?.size}</li>
            <li>warranty {data?.singleProduct?.warranty}</li>
            <li> Is available : {data?.singleProduct?.stockStatus}</li>
            <li>
              {" "}
              Is productCategory : {data?.singleProduct?.productCategory.name}
            </li>
            <li> Is productBrand : {data?.singleProduct?.productBrand.name}</li>
            <li>
              {" "}
              Is productSupplier : {data?.singleProduct?.productSupplier.name}
            </li>
            <li>isPublished {data?.singleProduct?.isPublished}</li>
            <li>paymentStatus {data?.singleProduct?.paymentStatus}</li>
            <li>salesStatus {data?.singleProduct?.salesStatus}</li>
            <li>
              isItemSupplierVerified:
              <span style={{ marginLeft: "10px" }}>
                {data?.singleProduct?.isItemSupplierVerified === true
                  ? "Verified"
                  : "Not Verified"}
              </span>
            </li>
          </ul>
          <h3>Product Reviews</h3>
          <Row>
            {data?.singleProduct?.productReview?.map((element: any) => {
              return (
                <Col span={8} key={element.id}>
                  <Card bordered={true}>{element.review}</Card>
                </Col>
              );
            })}
          </Row>
          <Row>
            <h3>Product Ratings</h3>

            {data?.singleProduct?.productRating?.map((element: any) => {
              return (
                <Col span={8} key={element?.id}>
                  <Card bordered={true}>{element?.review}</Card>
                </Col>
              );
            })}
          </Row>
        </Card>
      </Suspense>
    </div>
  );
};

export default SingleProduct;
