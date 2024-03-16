// "use client";
// import { Button, Col, Row, message } from "antd";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import FormInput from "@/components/forms/FormInput";
// import {
//   useGetSingleBillQuery,
//   useUpdateDraftBillMutation,
// } from "@/redux/api/draftApi";
// import { getUserInfo } from "@/app/auth/auth.service";
// import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
// import Form from "@/components/forms/Form";

// type Inputs = {
//   is_published: boolean;
// };

// const EditDraftBill = ({ params }: any) => {
//   const { id } = params;
//   const expId = id;

//   const { data: getSingleData } = useGetSingleBillQuery(undefined);

//   const role = getUserInfo();
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>();

//   const [updateDraftBill, { data }] = useUpdateDraftBillMutation();

//   const onSubmit: SubmitHandler<Inputs> = async (formData) => {
//     await updateDraftBill({
//       variables: {
//         expId: id,
//         post: {
//           is_published: formData.is_published,
//         },
//       },
//     });
//   };

//   useEffect(() => {
//     if (data && data.updateDraftBill) {
//       router.push(`/${role}/posts`);
//     }
//   }, [data]);

//   // @ts-ignore
//   const defaultValues = {
//     is_published: getSingleData?.is_published || "",
//   };

//   return (
//     <div className="main">
//       <UMBreadCrumb
//         items={[
//           {
//             label: "Posts",
//             link: `/${role}/posts`,
//           },
//           {
//             label: "Create Post",
//             link: `/${role}/posts/create`,
//           },
//         ]}
//       />

//       <Row
//         justify="center"
//         align="middle"
//         style={{
//           minHeight: "100vh",
//         }}
//       >
//         <Col sm={12} md={16} lg={10}></Col>
//         <Col sm={12} md={8} lg={8}>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               minHeight: "100%",
//             }}
//           >
//             <h1
//               style={{
//                 margin: "15px 0px",
//                 textAlign: "center",
//               }}
//             >
//               Update the Post ID : {id}
//             </h1>
//             <div>
//               <Form submitHandler={onSubmit} defaultValues={defaultValues}>
//                 <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
//                   <Col span={8} style={{ margin: "10px 0" }}>
//                     <FormInput name="is_published" label="published" />
//                   </Col>
//                 </Row>
//                 <Button type="primary" htmlType="submit">
//                   Update
//                 </Button>
//               </Form>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default EditDraftBill;
