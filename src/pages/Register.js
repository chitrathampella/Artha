import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ARTHA - Register";
  }, []);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === values.email);

        if (userExists) {
          message.error('User already registered. Please login.');
          return;
        }

        users.push({ name: values.name, email: values.email, password: values.password });
        localStorage.setItem('users', JSON.stringify(users));

        message.success('Registration successful! Please login.');
        navigate('/login');
      }, 1000);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="register-page d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center mb-4">
        <h2 className="fw-bold">ARTHA</h2>
        <h4 className="text-muted">Financial Management</h4>
      </div>
      {loading && <Spinner />}
      <div className="p-4 shadow-sm rounded border bg-white" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Register Page</h2>
        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <div className="text-center">
              <Link to="/login" className="d-block mb-2">Already registered? Login</Link>
              <Button type="primary" htmlType="submit" className="w-100 mt-2">
                Register
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
