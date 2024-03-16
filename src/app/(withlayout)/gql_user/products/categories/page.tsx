"use client";
import React, { useState, useEffect } from "react";
import { getUserInfo } from "@/app/auth/auth.service";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Spin } from "antd";
import { Suspense } from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GETPRODUCTSCATEGORIES } from "@/app/graphl/query/products/productCategory";

const ProductsCategoriesPage = () => {
  const { loading, error, data, refetch } = useQuery(GETPRODUCTSCATEGORIES);
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
              label: "Add Product Category",
              link: `/${role}/products/categories/create`,
            },
          ]}
        />
      </Suspense>
      <div className="content">
        <Suspense fallback={<Spin />}>
          <h1> Product page Content</h1>

          {data?.productsCategories?.map((categoryElement: any) => {
            return (
              <ul
                className="cats"
                key={categoryElement?.id}
                style={{
                  listStyle: "none",
                }}
              >
                <li>{categoryElement?.name}</li> <br />
                <li>{categoryElement?.description}</li> <br />
              </ul>
            );
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsCategoriesPage;
