"use client";

import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Row, Col } from "antd";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Loading from "@/app/loader";

// export const USER_PROFILE = gql`
//   query ShowUserProfile($userId: ID!) {
//     profile(userId: $userId) {
//       id
//       biodata
//       user {
//         name
//         email
//         id
//         posts {
//           content
//           createdAt
//           id
//           isPublished
//           title
//         }
//       }
//     }
//   }
// `;

const ProfilePage = () => {
  // const { loading, error, data } = useQuery(USER_PROFILE);
  // // console.log(data);

  // if (loading) return <Loading></Loading>;
  // if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="">
      <h4> Other Profile</h4>
    </div>
  );
};

export default ProfilePage;
