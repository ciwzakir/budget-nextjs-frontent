"use client";
import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import "./register.css";

const REGISTER_USERS = gql`
  mutation RegisterNewUser(
    $name: String!
    $email: String!
    $password: String!
    $userRole: AllowedUserRole!
  ) {
    registerUsers(
      name: $name
      email: $email
      password: $password
      userRole: $userRole
    ) {
      userErrorMessage
      token
    }
  }
`;

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const router = useRouter();

  const [registerUsers, { data, loading, error }] = useMutation(REGISTER_USERS);

  const handleRegisterUserFunc = (event: any) => {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      password: event.target.password.value,
      userRole: event.target.userRole.value,
      email: event.target.email.value,
    };
    registerUsers({ variables: data });
  };

  const [userError, setUserError] = useState(null);

  useEffect(() => {
    if (data && data.registerUsers.token)
      message.success(data.registerUsers.userErrorMessage);
    // router.push("/login");
  }, [data]);

  if (data && data.registerUsers.userError) {
    message.error(data.registerUsers.userErrorMessage);
  }

  return (
    <div className="register-container">
      <div className="">
        <form onSubmit={handleRegisterUserFunc} className="my-styled-form">
          <label htmlFor="name" className="form-label">
            name:
          </label>
          <input type="text" name="name" className="form-input" />

          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input type="email" name="email" className="form-input" />

          <label htmlFor="userRole" className="form-label">
            UserRole:
          </label>
          <input type="text" name="userRole" className="form-input" />

          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input type="password" name="password" className="form-input" />

          <button type="submit" className="submit-button">
            Submit Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
