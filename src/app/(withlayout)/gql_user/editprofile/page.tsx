// "use client";
// import { Alert, Button, Col, Row, message } from "antd";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { gql, useMutation } from "@apollo/client";
// import { useRouter } from "next/navigation";
// import { USER_ROLE } from "@/constants/role";
// import { useEffect } from "react";
// import { MYPROFILESFEATURES } from "@/app/graphl/query/query";

// const ADD_POST = gql`
//   mutation addPost($post: PostInput!) {
//     addpost(post: $post) {
//       message
//     }
//   }
// `;

// type Inputs = {
//   title: string;
//   content: string;
// };

// const CreateP = () => {
//   const role = USER_ROLE.GQL_USER;
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>();

//   const [addpost, { data, loading, error }] = useMutation(ADD_POST, {
//     refetchQueries: [{ query: MYPROFILESFEATURES }],
//   });

//   const onSubmit: SubmitHandler<Inputs> = async (formData) => {
//     const result = await addpost({
//       variables: {
//         post: {
//           title: formData.title,
//           content: formData.content,
//         },
//       },
//     });
//   };

//   useEffect(() => {
//     if (data && data.addpost.message) {
//       message.success(data.addpost.message);
//       // window.alert(data.addpost.message);
//       router.push(`/${role}/posts`);
//     }
//   }, [data]);

//   return (
//     <Row
//       justify="center"
//       align="middle"
//       style={{
//         minHeight: "100vh",
//       }}
//     >
//       <Col sm={12} md={16} lg={10}></Col>
//       <Col sm={12} md={8} lg={8}>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             minHeight: "100%",
//           }}
//         >
//           <h1
//             style={{
//               margin: "15px 0px",
//               textAlign: "center",
//             }}
//           >
//             Create a new Post
//           </h1>
//           <div
//             style={{
//               padding: "20px",
//               border: "1px solid #eaeaea",
//               borderRadius: "8px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               width: "100%",
//               boxSizing: "border-box",
//             }}
//           >
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <input
//                 placeholder="Title"
//                 {...register("title", { required: true })}
//                 style={{
//                   margin: "10px 0",
//                   padding: "8px",
//                   width: "100%",
//                   boxSizing: "border-box",
//                 }}
//               />
//               <input
//                 placeholder="Content"
//                 type="content"
//                 {...register("content", { required: true })}
//                 style={{
//                   margin: "10px 0",
//                   padding: "8px",
//                   width: "100%",
//                   boxSizing: "border-box",
//                 }}
//               />
//               <button
//                 type="submit"
//                 style={{
//                   margin: "15px 0",
//                   padding: "10px",
//                   backgroundColor: "#1890ff",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </Col>
//     </Row>
//   );
// };

// export default CreateP;
