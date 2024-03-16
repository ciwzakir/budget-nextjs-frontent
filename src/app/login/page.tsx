"use client";
import { useEffect, useState } from "react";
import { Button, Col, Row, message } from "antd";
import loginImage from "../../assets/images/Reset password-rafiki.svg";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { USER_ROLE } from "@/constants/role";
import { MYPROFILESFEATURES } from "../graphl/query/query";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { getUserInfo, storeUserInfo } from "../auth/auth.service";

const LOGIN_USERS = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userErrorMessage
    }
  }
`;

// const role = USER_ROLE.GQL_USER;

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [login, { data, loading, error }] = useMutation(LOGIN_USERS, {
    refetchQueries: [{ query: MYPROFILESFEATURES }],
  });

  const [loginMessage, setLoginMessage] = useState(null);
  const { data: getData, refetch } = useQuery(MYPROFILESFEATURES);
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      const result = await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (result.data && result.data.login.token) {
        refetch();
        // console.log(result?.data?.login?.token);
        // localStorage.setItem("token", result?.data?.login?.token);
        storeUserInfo({ token: result?.data?.login?.token });
        const { userRole: role } = getUserInfo() as any;
        // console.log("role", role);
        message.success(result?.data?.login?.userErrorMessage);
        if (result?.data?.login?.token) {
          router.push(`/${role}/myprofile`);
        }
        // console.log("User role is", getData);
      }
    } catch (error) {
      // console.error("Login error:", error);
    }
  };

  // useEffect(() => {
  //   if (data && data.login.token) {
  //     localStorage.setItem("accessToken", data.login.token);
  //   }
  //   if (data && data.login.userErrorMessage) {
  //     setLoginMessage(data.login.userErrorMessage);
  //   }
  // }, [data]);

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          Log In
        </h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <input
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
            <input type="submit" />
          </form>

          {loginMessage && <p style={{ color: "red" }}>{loginMessage}</p>}
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
