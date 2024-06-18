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
import EmployeeProfiles from './pages/EmployeeProfiles.js';
import EmployeeProfile from './pages/EmployeeProfile.js';
import VisaStatusManagement from './pages/VisaStatusManagement.js';
import HiringManagement from './pages/HiringManagement.js';
import Homepage from './pages/Homepage.js' 
import EmployeeApplications from './pages/EmployeeApplications.js';
import { useSelector } from 'react-redux'; // Import useSelector hook

function App() {
  const userEmail = useSelector(state => state.employee.email); // Access email from Redux store
  return (
    <Router>
      {userEmail && <Header />} 
      <div className="container mt-4">
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/send-email" element={<SendEmailPage />} />
          <Route path="/CreateProduct" element={<CreateProduct />} />
          <Route path="/OnBoarding" element={<OnBoarding />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Add RegisterPage route */}
          <Route path="/EmployeeProfiles" element={<EmployeeProfiles />} /> {/* Add RegisterPage route */}
          <Route path="/profile/:id" element={<EmployeeProfile />} />
          <Route path="/VisaStatusManagement" element={<VisaStatusManagement />} />
          <Route path="HiringManagement" element={<HiringManagement />} />
          <Route path="EmployeeApplications" element={<EmployeeApplications />} />
        </Routes> 
      </div>
      <Footer />
    </Router>
  );
}

export default App;
