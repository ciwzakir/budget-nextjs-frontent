"use client";
import { Card, message } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GETSINGLEPOST } from "@/app/graphl/query/query";
import Loading from "@/app/loader";
import dayjs from "dayjs";

const SinglePost = ({ params }: any) => {
  const postId = params.id;
  const { loading, error, data } = useQuery(GETSINGLEPOST, {
    variables: { postId },
  });

  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (data?.post?.createdAt) {
      let date = data.post.createdAt;
      date /= 1000;

      const dateInstance = new Date(date);

      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      const formattedDateString = dateInstance.toLocaleString("en-US", options);

      setFormattedDate(formattedDateString);
    }
  }, [data]);

  if (loading) {
    return <Loading></Loading>;
  } else if (error) {
    return message.error("Something wrong");
  } else {
    message.success("Successful");
  }

  return (
    <Card
      title={data.post.title}
      bordered={true}
      style={{ width: 300, margin: "30px 50px" }}
    >
      <p> Post Id: {data.post.id}</p> <br />
      <p>{data.post.content}</p> <br />
      <p>{data.post.isPublished}</p> <br />
      <p>
        {dayjs(data.post.createdAt / 1000).format("MMM, D, YYYY, hh:mm, A")}
      </p>
      <p>Date: {formattedDate}</p>
    </Card>
  );
};

export default SinglePost;
