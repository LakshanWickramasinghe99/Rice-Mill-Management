import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import {Product,Reports } from "./components/Pages/Product";
import Sales from './components/Pages/Sales';
import Addproduct from './components/Pages/Addproduct';
import Deleteproduct from './components/Pages/Deleteproduct';
import UpdateProduct from './components/Pages/Updateproduct';
import Sidebar from './components/Pages/Sidebar';
import Imguploder from './components/Pages/ImageUploader/Imguploder';
import Productdetails from './components/Pages/Productdetails';

function App() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} /> 
          <Route path='/updateproduct/:id' element={<UpdateProduct />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/sales' element={<Sales />} />
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/deleteproduct' element={<Deleteproduct />} />
          <Route path='/imgpart' element={<Imguploder />} />
          <Route path='/productdetails' element={<Productdetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
