"use client";
import React from "react";
import { Col, Row, Table, Avatar, Space } from "antd";
import { useQuery } from "@apollo/client";
import { Card } from "antd";
import "./page.css";
import { UserOutlined } from "@ant-design/icons";
import Loading from "@/app/loader";
import { MYPROFILESFEATURES } from "@/app/graphl/query/query";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { USER_ROLE } from "@/constants/role";

const MyprofilePage = () => {
  const role = USER_ROLE.GQL_USER;
  const { loading, error, data } = useQuery(MYPROFILESFEATURES);

  if (loading) return <Loading />;

  if (error) return <p>Error : {error.message}</p>;
  console.log(data);
  // const { myprofile } = data;
  // const { user } = myprofile;
  // const { profile, posts } = user;
  // const { biodata } = profile;
  // const {id, userName, personalInformation, educationQualifications
  // , userAddress} = biodata;

  const { myprofile } = data;

  // Use optional chaining to handle null or undefined
  const user = myprofile?.user;
  const profile = user?.profile;
  const biodata = profile?.biodata;

  // Destructure properties with default values or provide default values as needed
  const {
    id = "",
    userName = "",
    personalInformation = "",
    educationQualifications = "",
    userAddress = "",
  } = biodata || {};

  // Now you can use id, userName, personalInformation, educationQualifications, and userAddress safely

  // console.log("profile", biodata);

  const columns = [
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
    },
    {
      title: "Subject",
      dataIndex: "fieldOfStudy",
      key: "fieldOfStudy",
    },
    {
      title: " Passing Year",
      dataIndex: "graduationYear",
      key: "graduationYear",
    },
    {
      title: "Institute Name",
      dataIndex: "instituteName",
      key: "instituteName",
    },
    {
      title: "Obtain Grade",
      dataIndex: "obtainGrade",
      key: "obtainGrade",
    },
  ];

  return (
    <div className="common">
      <div className="bredcumb">
        <UMBreadCrumb
          items={[
            {
              label: "Posts",
              link: `/${role}/posts`,
            },
            {
              label: "Create Post",
              link: `/${role}/posts/create`,
            },
            {
              label: "Edit Post",
              link: `/${role}/posts/edit/${id}`,
            },
          ]}
        />
      </div>
      <Row>
        <Col span={18}>
          <div className="user__profile--info">
            <div className="sub__div--style">
              <h1> Profile ID : {user?.profile?.id}</h1>
              <h1 className="title__margin"> Full Name </h1>
              <h3> First Name: {userName?.firstName}</h3>
              <h3> Middle Name: {userName?.middleName}</h3>
              <h3> Last Name: {userName?.lastName}</h3>
            </div>
            <div className="sub__div--style">
              <h1 className="title__margin">
                Personal Additional Information :
              </h1>
              <p> Age : {personalInformation?.age} </p>
              <p> gender : {personalInformation?.gender} </p>
              <p> bloodGroup : {personalInformation?.bloodGroup} </p>
              <p> maritalStatus : {personalInformation?.maritalStatus} </p>
              <p> nationality : {personalInformation?.nationality} </p>
              <p> phoneNumber : {personalInformation?.phoneNumber} </p>
            </div>
            <div className="sub__div--style">
              <h1 className="title__margin"> Address :</h1>
              <p> City : {userAddress?.city} </p>
              <p> Street : {userAddress?.street} </p>
              <p> ZipCode : {userAddress?.zipCode} </p>
            </div>
            <div className="sub__div--style">
              <h1 className="title__margin"> Educational Qualification :</h1>
              <Table dataSource={educationQualifications} columns={columns} />;
            </div>
          </div>
        </Col>
        <Col span={6}>
          <Space direction="vertical" size={16}>
            <Space wrap size={32}>
              <Avatar size={128} icon={<UserOutlined />} />
            </Space>
          </Space>
          <p>User ID : {user?.id}</p>
          <p>User Email : {user?.email} </p>
        </Col>
      </Row>
    </div>
  );
};

export default MyprofilePage;
