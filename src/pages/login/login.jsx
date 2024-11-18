import React from "react";
import styled from "styled-components";
import { Form, Input, Button } from "antd";

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
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <LoginContainer>
      <LoginFormWrapper>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
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
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </LoginFormWrapper>
    </LoginContainer>
  );
};

export default Login;
