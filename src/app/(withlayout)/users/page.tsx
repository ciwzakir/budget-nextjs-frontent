"use client";
import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Card, Row, Col } from "antd";

const GET_USERS = gql`
  query Users {
    users {
      name
      id
      email
      profile {
        biodata {
          id
          userName {
            id
            firstName
            middleName
            lastName
          }
          userAddress {
            id
            city
            street
            zipCode
          }
          personalInformation {
            id
            age
            bloodGroup
            gender
            maritalStatus
            phoneNumber
            nationality
          }
          educationQualifications {
            id
            fieldOfStudy
            graduationYear
            instituteName
            obtainGrade
            qualification
          }
        }
      }
      posts {
        title
        content
        isPublished
        createdAt
        isPublished
        author {
          email
        }
      }
    }
  }
`;

const Getusers = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const layoutStyle = {
    margin: "25px",
    padding: "10px",
  };

  // console.log(data.users.author);

  return data?.users?.map((user: any) => (
    <Row key={user.id} style={layoutStyle}>
      <Col xs={2} sm={4} md={6} lg={8} xl={10}>
        <h3>
          User Name :{user.email} || Email : {user.name} || User ID : {user.id}
        </h3>

        {user.posts.map((sp: any) => (
          <div key={sp.id}>
            <Card style={{ width: 400, marginTop: 20 }}>
              <p> Post ID :{sp.id}</p>
              <p> Post Content :{sp.content}</p>
              <p> Post Title :{sp.title}</p>
              <p> Is the Post Published : {sp.isPublished}</p> <br />
              {
                <>
                  <div className="divstyle">
                    <p> Post author ID: {sp.author.id}</p>
                    <p> Post author Name: {sp.author.name}</p>
                    <p> Post author email:{sp.author.email}</p>
                    <div className="divstyle">
                      <p>
                        {" "}
                        Post author profile createdAt:{" "}
                        {sp.author.profile?.createdAt}
                      </p>
                      <p>
                        {" "}
                        Post author profile biodata:{" "}
                        {sp.author.profile?.biodata}
                      </p>
                      <p>
                        {" "}
                        Post author profile name:{" "}
                        {sp.author.profile?.user?.name}
                      </p>
                    </div>
                  </div>
                </>
              }
            </Card>
          </div>
        ))}
      </Col>
    </Row>
  ));
};
export default Getusers;
