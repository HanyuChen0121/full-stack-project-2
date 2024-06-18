import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from '../reducers/employeeSlice.js';
import HiringManagement from '../pages/HiringManagement.js';
import EmployeeProfiles from '../pages/EmployeeProfiles.js';
import EmployeeApplications from '../pages/EmployeeApplications.js';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from React Router
import '../index.css';

const Header = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.employee.email); 
  const userRole = useSelector(state => state.employee.role);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(resetState());
    navigate('/');
    // Additional logic to redirect or handle logout
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Chuwa management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userRole !== 'HR' && (<Nav.Link as={Link} to="/Onboarding">OnBoarding application</Nav.Link>)}
            <Nav.Link as={Link} to="/VisaStatusManagement">Visa Status</Nav.Link>
            {userRole === 'HR' && <Nav.Link as={Link} to="/HiringManagement">Hiring Management</Nav.Link>}
            {userRole === 'HR' && <Nav.Link as={Link} to="/EmployeeProfiles">EmployeeProfiles</Nav.Link>}
            {userRole === 'HR' && <Nav.Link as={Link} to="/EmployeeApplications">EmployeeApplications</Nav.Link>}
          </Nav>
          {userEmail ? (
            <Nav>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;