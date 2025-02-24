import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    document.title = "ARTHA - Login";
  }, []);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.email === values.email);

        if (!foundUser) {
          message.error('User not found. Please register.');
          return;
        }

        message.success('Login successful');
        localStorage.setItem('user', JSON.stringify({ email: foundUser.email, name: foundUser.name }));

        navigate('/');
      }, 1000);
    } catch (error) {
      setLoading(false);
      message.error('Invalid username or password');
    }
  };

  return (
    <div className="register-page d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center mb-4">
        <h2 className="artha-title">ARTHA</h2>
        <h4 className="artha-subtitle">Financial Management</h4>
      </div>
      {loading && <Spinner />}
      <div className="p-4 shadow-sm rounded border bg-white" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Login Page</h2>
        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <div className="text-center">
              <Link to="/register" className="d-block mb-2">Not a user? Register</Link>
              <Button type="primary" htmlType="submit" className="w-100 mt-2">
                Login
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
