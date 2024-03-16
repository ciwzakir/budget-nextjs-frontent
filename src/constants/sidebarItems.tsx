import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  EditOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
import Loading from "@/app/loader";
// import { getUserInfo } from "@/app/auth/auth.service";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/myprofile`}>My Profile</Link>,
          key: `/${role}/myprofile`,
        },
        {
          label: (
            <Link href={`/${role}/myprofile/create`}> Create Profile</Link>
          ),
          key: `/${role}/create`,
        },
        {
          label: <Link href={`/${role}/editprofile`}> Edit Profile</Link>,
          key: `/${role}/editprofile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
  ];

  const gqlUserSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    // {
    //   label: "Post",
    //   key: "post",
    //   icon: <DatabaseOutlined />,
    //   children: [
    //     {
    //       label: <Link href={`/${role}/posts`}>Posts</Link>,
    //       icon: <TableOutlined />,
    //       key: `/${role}/posts`,
    //     },
    //     {
    //       label: (
    //         <Link href={`/${role}/postcategories/view`}>Post Category</Link>
    //       ),
    //       icon: <EditOutlined />,
    //       key: `/${role}/postCategoryView`,
    //     },
    //   ],
    // },
    // {
    //   label: "Products",
    //   key: "products",
    //   icon: <DatabaseOutlined />,
    //   children: [
    //     {
    //       label: <Link href={`/${role}/products/views`}>Products</Link>,
    //       icon: <TableOutlined />,
    //       key: `/${role}/products`,
    //     },
    //     {
    //       label: (
    //         <Link href={`/${role}/products/categories`}>Product Category</Link>
    //       ),
    //       icon: <EditOutlined />,
    //       key: `/${role}/productsCategories`,
    //     },
    //     {
    //       label: <Link href={`/${role}/products/brands`}>Product Brand</Link>,
    //       icon: <EditOutlined />,
    //       key: `/${role}/productsBrands`,
    //     },
    //     {
    //       label: (
    //         <Link href={`/${role}/products/suppliers`}>Product Suppliers</Link>
    //       ),
    //       icon: <EditOutlined />,
    //       key: `/${role}/productSuppliers`,
    //     },
    //   ],
    // },
    {
      label: "Expense",
      key: "expense",
      icon: <DatabaseOutlined />,
      children: [
        {
          label: (
            <Link href={`/${role}/expense/suppliers/draft`}>Draft Bills</Link>
          ),
          icon: <TableOutlined />,
          key: `/${role}/draft`,
        },
        {
          label: <Link href={`/${role}/expense/views`}>Master Data</Link>,
          icon: <TableOutlined />,
          key: `/${role}/expense`,
        },

        {
          label: <Link href={`/${role}/expense/year/code`}>Return Codes</Link>,
          icon: <TableOutlined />,
          key: `/${role}/expenseYearCodes`,
        },
        {
          label: (
            <Link href={`/${role}/expense/year/company`}>Return Company</Link>
          ),
          icon: <TableOutlined />,
          key: `/${role}/expenseYearCompany`,
        },
        {
          label: (
            <Link href={`/${role}/expense/suppliers/cheque-list`}>
              Cheque Payment
            </Link>
          ),
          icon: <TableOutlined />,
          key: `/${role}/chequeList`,
        },
        {
          label: (
            <Link href={`/${role}/expense/suppliers/cash-payment`}>
              Cash Payment
            </Link>
          ),
          icon: <TableOutlined />,
          key: `/${role}/cashPayment`,
        },
      ],
    },
  ];

  if (role === undefined) return <Loading></Loading>;
  else if (role === USER_ROLE.GQL_USER) return gqlUserSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
