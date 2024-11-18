import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { useSignIn } from "../../hooks/useLogin";
import { setCookie } from "../../hooks/useCookie";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
  width: 100vw;
  height: 100vh;
`;

const LoginFormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Login = () => {
  const signIn = useSignIn();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = (values) => {
    const username = values.username;
    const password = values.password;

    setLoading(true);

    const onSuccess = (user) => {
      setTimeout(() => {
        setCookie("role", user?.role);
        setCookie("token", user?.token);
        setCookie("name", user?.name);
        setLoading(false);
        nav("/");
      }, 1000);
    };

    const onError = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    signIn(username, password, onSuccess, onError);
  };

  return (
    <LoginContainer>
      <LoginFormWrapper>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <Form name="login" onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </Form.Item>
        </Form>
      </LoginFormWrapper>
      {loading && (
        <div className="loaderWindow">
          <div className="loader"></div>
        </div>
      )}
    </LoginContainer>
  );
};

export default Login;
