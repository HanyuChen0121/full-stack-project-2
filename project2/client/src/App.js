import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header.js';
import Footer from './components/Footer.js';
import SignInPage from './pages/SignInPage.js';
import SignUpPage from './pages/SignUpPage.js';
import UpdatePasswordPage from './pages/UpdatePasswordPage.js';
import SendEmailPage from './pages/SendEmailPage.js';
import ProductList from './pages/ProductList.js';
import CreateProduct from './pages/CreateProduct.js';
import ProductDetails from './pages/ProductDetails.js';
import EditProduct from './pages/EditProduct.js';
import Login from './pages/Login.js';
import OnBoarding from './pages/OnBoarding.js';
import EmployeeManagement from './pages/EmployeeManagement.js';
import RegisterPage from './pages/RegisterPage.js';
function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/send-email" element={<SendEmailPage />} />
          <Route path="/CreateProduct" element={<CreateProduct />} />
          <Route path="/On" element={<EmployeeManagement />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Add RegisterPage route */}
          <Route path="/Onboarding" element={<OnBoarding />} /> {/* Add RegisterPage route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
