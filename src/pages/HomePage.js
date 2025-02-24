import React, { useEffect, useState } from "react";
import { Modal, Select, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const HomePage = () => {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [form] = Form.useForm();


  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (values) => {
    setTransactions([...transactions, values]); // Add transaction
    setShowModel(false); // Close modal
    form.resetFields(); // Reset form fields ✅
  };

  const income = transactions.filter((txn) => txn.type === "income");
  const expenses = transactions.filter((txn) => txn.type === "expense");

  const totalIncome = income.reduce((acc, txn) => acc + Number(txn.amount), 0);
  const totalExpense = expenses.reduce((acc, txn) => acc + Number(txn.amount), 0);

  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense }
  ];

  const COLORS = ["#28a745", "#dc3545"];

  return (
    <div>
      <h2 className="text-center">Financial Overview</h2>
      <div className="d-flex justify-content-center">
        <ResponsiveContainer width={300} height={200}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="filters">
        <div>Filters</div>
        <button className="btn btn-primary" onClick={() => setShowModel(true)}>Add New</button>
      </div>

      <table className="table table-striped table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={index}>
              <td className={txn.type === "income" ? "text-success fw-bold" : "text-danger fw-bold"}>{txn.type.toUpperCase()}</td>
              <td>{txn.amount}</td>
              <td>{txn.category.toUpperCase()}</td>
              <td>{txn.date}</td>
              <td>{txn.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal title="Add Transaction" open={showModel} onCancel={() => setShowModel(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please enter amount!" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true, message: "Please select type!" }]}>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please select category!" }]}>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movies">Movies</Select.Option>
              <Select.Option value="transport">Transport</Select.Option>
              <Select.Option value="cosmetics">Cosmetics</Select.Option>
              <Select.Option value="fee">Fees</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please enter date!" }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
