import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Typography, Button, Container, TextField, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Home Component
function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteProduct = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/products/${id}`);
        setData(data.filter(product => product._id !== id));
        window.alert('Product successfully deleted.');
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Title', 'Description', 'Price']],
      body: data.map(({ title, description, price }) => [title, description, price]),
    });
    doc.save('product_report.pdf');
  };

  const filteredData = data.filter(productItem =>
    productItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    productItem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    productItem.price.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Dashboard</Typography>
      <TextField
        type="text"
        label="Search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button onClick={generatePDFReport} variant="contained" color="primary" sx={{ mb: 2 }}>Generate Report</Button>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((productItem, i) => (
            <TableRow key={i}>
              <TableCell>{productItem.title}</TableCell>
              <TableCell>{productItem.description}</TableCell>
              <TableCell>{productItem.price}</TableCell>
              <TableCell>
                <Button component={Link} to={`/updateproduct/${productItem._id}`} variant="contained" color="primary" sx={{ mr: 1 }}>Update</Button>
                <Button variant="outlined" onClick={() => deleteProduct(productItem._id)} color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

// Reports Component
function Reports() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Manage Location
      </Typography>
      <Link to="/addproduct" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Product
        </Button>
      </Link>
    </Container>
  );
}

export { Home, Reports };
