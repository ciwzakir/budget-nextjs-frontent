import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
// @ts-expect-error
import type { GetProp, UploadProps } from "antd";
import Image from "next/image";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  // @ts-expect-error
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  // @ts-expect-error
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  // @ts-expect-error
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

type ImageUploadProps = {
  name: string;
  setImageUrl: (url: string) => void; // Function to update image URL state
};

const ImageUploaderPage = ({ name, setImageUrl }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrlLocal, setImageUrlLocal] = useState<string>(); // Rename to avoid collision

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrlLocal(url); // Set the local image URL
        setImageUrl(url); // Call the prop function to update the parent's state
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/file"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrlLocal ? (
          <Image
            src={imageUrlLocal}
            width={100}
            height={100}
            alt="avatar"
            style={{ width: "100%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default ImageUploaderPage;
