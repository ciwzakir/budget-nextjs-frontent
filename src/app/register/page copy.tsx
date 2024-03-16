// "use client";
// import { gql, useMutation } from "@apollo/client";
// import React, { useEffect, useState } from 'react';
// import {Layout, Button, Alert, Space } from 'antd';
// import { useRouter } from "next/navigation";

// const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//   console.log(e, 'I was closed.');
// };

// const { Header, Content } = Layout;
// const headerStyle: React.CSSProperties = {
//   textAlign: 'center',
//   color: '#fff',
//   height: 64,
//   paddingInline: 48,
//   lineHeight: '64px',
//   backgroundColor: '#4096ff',
// };

// const contentStyle: React.CSSProperties = {
//   textAlign: 'center',
//   minHeight: 120,
//   lineHeight: '120px',
//   color: '#fff',
//   backgroundColor: '#0958d9',
// };

// const layoutStyle = {
//   borderRadius: 8,
//   overflow: 'hidden',
//   width: 'calc(50% - 8px)',
//   maxWidth: 'calc(70% - 8px)',

// };

// const REGISTER_USERS = gql`
//   mutation RegisterUser($name: String!, $email: String!, $password: String!) {
//     registerUsers(name: $name, email: $email, password: $password) {
//       userErrorMessage
//       token
//     }
//   }
// `;

// const RegisterPage = () => {
//   const router = useRouter();
// <Space direction="vertical" style={{ width: '100%' }}></Space>
//   const [registerUsers, {data, loading, error }] = useMutation(REGISTER_USERS);

//   const handleRegisterUserFunc = (event:any)=>{
//     event.preventDefault();
//     const data ={
//       name: event.target.name.value,
//       password: event.target.password.value,
//       email: event.target.email.value
//     }
//     registerUsers({ variables: data });

//   }
//   // if (loading) {
//   //   alert('Loading')
//   // }
//   // else if (error) {
//   //   alert('something wrong')
//   // }
//   // else {
//   //   // const userErrorMessage = data
//   //   alert('userErrorMessage')
//   // }
// const [userError, setUserError]= useState(null);

// useEffect(()=>{
// if(data && data.registerUsers.token)
// // localStorage.setItem('token', data.registerUsers.token)
// router.push('/login');
// },[data]  )
// if (data && data.registerUsers.userError) {
//   setUserError(data.registerUsers.userError)
// }

// return (
//    <div className="text-center container">
// <Layout style={layoutStyle}>
//   <Header style={headerStyle}>

//     <Alert
//       message={'userErrorMessage'}
//       type="warning"
//       closable
//       onClose={onClose}
//     />
//     </Header>
//   <Content style={contentStyle}>

//   <form onSubmit={handleRegisterUserFunc}>
//       <label htmlFor="">First name:</label>
//       <input type="text" name="name" />
//       <label htmlFor="">Email:</label>
//       <input type="email" name="email" />
//       <label htmlFor="">Password:</label>
//       <input type="password" name="password" />
//       <label htmlFor="">Submit Now</label>
//       <button type="submit" className="m-2" >Submit</button>

//   </form>

//   </Content>

// </Layout>

//    </div>

//   );
// };

// export default RegisterPage;
