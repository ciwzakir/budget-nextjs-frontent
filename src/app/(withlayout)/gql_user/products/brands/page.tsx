"use client";

import { Card, Col, Row, Spin } from "antd";
import React, { useState, useEffect, Suspense } from "react";
import { getUserInfo } from "@/app/auth/auth.service";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GETPRODUCTSBRANDS } from "@/app/graphl/query/products/productBrands";

const ProductsBrandsPage = () => {
  const { loading, error, data, refetch } = useQuery(GETPRODUCTSBRANDS);
  console.log(data);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = (await getUserInfo()) as any;
        setRole(userInfo.userRole);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
    // console.log("fetchUserInfo", fetchUserInfo());
  }, []);

  if (role === null || role === undefined) {
    return <Spin />;
  }
  return (
    <div style={{ marginLeft: "20px" }}>
      <Suspense fallback={<Spin />}>
        <UMBreadCrumb
          items={[
            {
              label: "Products",
              link: `/${role}/products/`,
            },
            {
              label: "Add New ",
              link: `/${role}/products/brands/create`,
            },
            {
              label: "Brands update",
              link: `/${role}/products/brands/update`,
            },
            {
              label: "Brands Delete",
              link: `/${role}/products/brands/delete`,
            },
          ]}
        />
      </Suspense>
      <div className="content">
        <Suspense fallback={<Spin />}>
          <h1> Product Brands Content</h1>
          <Row gutter={16} style={{ marginTop: "25px" }}>
            {data?.productsBrands?.map((element: any) => {
              return (
                <Col span={8} key={element.id}>
                  <Card title={element.name} bordered={true}>
                    {element.description}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsBrandsPage;
