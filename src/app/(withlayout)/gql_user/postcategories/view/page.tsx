"use client";


import { GETPOSTCATEGORIES } from "@/app/graphl/query/posts/posts";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { USER_ROLE } from "@/constants/role";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Spin } from "antd";
import { Suspense } from "react";

const AllCategories = () => {
  const { data: categories } = useQuery(GETPOSTCATEGORIES);

  // const count = async (): Promise<number> => {
  //   if (categories?.postCategories?.length >= 0) {
  //     return categories.postCategories.length;
      
  //   }
  //   return 0;
  // };
  
  // console.log(count());

  const role = USER_ROLE.GQL_USER;

  return (
    <div className="main">
      <UMBreadCrumb
        items={[
          {
            label: "Create New Category",
            link: `/${role}/postcategories/create`,
          },
          {
            label: "Update Category",
            link: `/${role}/postCategoryUpdate`,
          },
          {
            label: "Delete Category",
            link: `/${role}/postDeleteUpdate`,
          },
        ]}
      />

      <Suspense fallback={<Spin />}>
        <div
          className="m-4"
          style={{
            margin: "30px",
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              marginBottom: "30px",
            }}
          >
            Post Categories
          </h1>
          {categories?.postCategories?.map((categoryElement: any) => {
            return (
              <ul
                className="cats"
                key={categoryElement?.id}
                style={{
                  listStyle: "none",
                }}
              >
                <li>{categoryElement?.name}</li> <br />
              </ul>
            );
          })}
        </div>
      </Suspense>
    </div>
  );
};

export default AllCategories;
