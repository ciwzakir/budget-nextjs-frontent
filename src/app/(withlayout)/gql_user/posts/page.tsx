"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import type { GetProp } from "antd";
import { DatePicker, Modal, Space, Spin } from "antd";
import { Button, Tag, Input, message, Radio, Checkbox, Col, Row } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "@/app/loader";
import "./page.css";
import {
  ContactsTwoTone,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { MYPROFILESFEATURES } from "@/app/graphl/query/query";
import RETable from "@/components/ui/RETable";
import Link from "next/link";
import dayjs from "dayjs";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { DELETEPOST_GQL } from "@/app/graphl/mutations/muttion";
import ActionBarComponent from "@/components/ui/AtionBar";
import { getUserInfo } from "@/app/auth/auth.service";
import { GETPOSTCATEGORIES } from "@/app/graphl/query/posts/posts";

const { RangePicker } = DatePicker;
const { userRole: role } = getUserInfo() as any;

const MyPostPage = () => {
  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues: any
  ) => {
    // console.log("checked = ", checkedValues);
  };
  const { loading, error, data, refetch } = useQuery(MYPROFILESFEATURES);
  const { data: categories } = useQuery(GETPOSTCATEGORIES);

  console.log("Categories", categories?.length);
  // console.log("Categories", Categories);
  const [deletepost, { data: deleteData }] = useMutation(DELETEPOST_GQL, {
    refetchQueries: [{ query: MYPROFILESFEATURES }],
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showPublished, setShowPublished] = useState(false);
  const [dateRange, setDateRange] = useState("");

  const handleCategoryChange = (checkedValues: any) => {
    setSelectedCategories(checkedValues);
  };

  const handleShowPublishedChange = (checked: any) => {
    setShowPublished(checked);
  };

  const handleDateRangeChange = (payload: any) => {
    console.log("handleDateRangeChange", payload);
    setDateRange(payload);
  };

  const filteredPosts = data?.myprofile?.user?.posts.filter((post: any) => {
    const categoryCondition =
      selectedCategories.length === 0 ||
      (post.postCategory &&
        selectedCategories.includes(post?.postCategory?.id));

    const publishedCondition = showPublished ? post.isPublished === true : true;

    const dateRangeCondition =
      !dateRange ||
      (post?.createdAt >= dateRange[0]?.valueOf() &&
        post?.createdAt <= dateRange[1]?.valueOf());

    // Return true if all conditions are met
    return categoryCondition && publishedCondition && dateRangeCondition;
  });

  if (loading) return <Loading />;

  if (error) return <p>Error : {error.message}</p>;

  const deleteHandler = async (id: any) => {
    await deletepost({
      variables: {
        postId: id,
      },
    });
    message.success(deleteData?.deletepost?.message);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) => a.id - b.id,
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Post Category",
      dataIndex: "postCategory",
      render: function (data: any) {
        if (data) {
          return data.name;
        } else return "No Category Found";
      },
    },

    {
      title: "Is Published",
      dataIndex: "isPublished",
      render: function (data: any) {
        if (data === true) {
          return "Published";
        } else return "Not Published";
      },
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: function (data: any) {
        if (data && dayjs(data).isValid()) {
          return dayjs(parseInt(data)).format("DD MMM YYYY HH:mm:ss");
          // return dayjs(data).format("MMM, D, YYYY hh:mm A");
        } else {
          // Handle the case where 'data' is not a valid date
          return "Invalid date";
        }
      },
      sorter: (a: any, b: any) => a.createdAt - b.createdAt,
    },
    {
      title: "Actions",
      render: (data: any) => {
        return (
          <div className="main">
            <div className="sub">
              <Link href={`posts/view/${data.id}`}>
                <Button type="primary" ghost>
                  <EyeOutlined /> View
                </Button>
              </Link>

              <Link href={`posts/publish/${data.id}`}>
                <Button
                  type="primary"
                  ghost
                  className="action__button-style"
                  disabled={data.isPublished === true}
                >
                  <ContactsTwoTone /> Publish Now
                </Button>
              </Link>
              <Link href={`posts/edit/${data.id}`}>
                <Button className="action__button-style" type="primary" ghost>
                  <EditOutlined /> Edit
                </Button>
              </Link>

              <Link href={`posts/delete/${data.id}`}>
                <Button
                  type="primary"
                  danger
                  ghost
                  className="action__button-style"
                >
                  <DeleteOutlined /> Delete with Modal
                </Button>
              </Link>

              <Button
                onClick={() => deleteHandler(data?.id)}
                // onClick={() => console.log(data.id)}
                type="primary"
                danger
                ghost
                className="action__button-style"
              >
                <DeleteOutlined /> Delete
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const onChangeOfPagintion = (page: number, pageSize: number) => {
    // console.log(page, pageSize);
  };

  const onChangeTable = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
  };

  return (
    <div className="common">
      <UMBreadCrumb
        items={[
          {
            label: "Profile",
            link: `/${role}/myprofile`,
          },
          {
            label: "Create Post",
            link: `/${role}/posts/create`,
          },
          {
            label: "Edit Post",
            link: `/${role}/posts/edit/${data?.id}`,
          },
        ]}
      />
      <div
        className="sub__div--style"
        style={{ justifyContent: "space-between", display: "flex" }}
      >
        <ActionBarComponent title="">
          <Link href="posts/create">
            <Button type="primary">Add New Post</Button>
          </Link>
        </ActionBarComponent>
      </div>

      <h2 style={{ margin: "30px 0" }}> Search and Filter Data</h2>
      <h3 style={{ margin: "30px 0" }}> Filter By Categories</h3>
      <div className="">
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={handleCategoryChange}
        >
          <Row>
            {categories?.postCategories?.map((cat: any) => (
              <Col span={8} key={cat.id}>
                <Checkbox value={cat.id}> {cat.name}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>
      <div className="">
        <h3 style={{ margin: "30px 0" }}> Filter By Date Range</h3>
        <Row>
          <Col>
            <Space direction="vertical" size={12}>
              <RangePicker
                showTime
                onChange={(e) => handleDateRangeChange(e)}
              />
            </Space>
          </Col>
        </Row>
      </div>
      <div
        className="sub__div--style"
        style={{ justifyContent: "space-between", display: "flex" }}
      >
        <Input
          type="text"
          size="large"
          placeholder="Search ..."
          style={{ width: "30%", marginTop: "25px" }}
        />

        <Checkbox
          checked={showPublished}
          onChange={(e) => handleShowPublishedChange(e.target.checked)}
        >
          Show Only Published Posts
        </Checkbox>
      </div>
      <Suspense fallback={<Spin />}>
        <RETable
          loading={false}
          columns={columns}
          // dataSource={data?.myprofile?.user?.posts}
          dataSource={filteredPosts}
          pageSize={3}
          total={5}
          showSizeChanger={true}
          onChangeOfPagintion={onChangeOfPagintion}
          onChangeTable={onChangeTable}
          showPagination={true}
        ></RETable>
      </Suspense>
    </div>
  );
};

export default MyPostPage;
