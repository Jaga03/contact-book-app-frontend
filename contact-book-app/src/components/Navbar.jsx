import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'


function ColorSchemesExample() {
   const {user,logout}=useAuth()
   const navigate = useNavigate()

   const handleLogout = () =>{
    logout();
    navigate('/login')
   }

  return (
    <>
         <Navbar bg="light" data-bs-theme="light" className='nav-bar-container'>
        <Container>
          <Navbar.Brand as={Link} to='/'className='fs-2'>Contact Book</Navbar.Brand>
          <Navbar.Toggle aria-controls = "basic-navbar-nav"/>
          <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className="me-auto">
            {!user ? (
             <>
             <Nav.Link as={Link} to='/login' className='fs-4'>Login</Nav.Link>
            <Nav.Link as={Link} to='/register'className='fs-4'>Register</Nav.Link>
             </>
            ):(
             <>
            <Nav.Link disabled className='fs-4' >Hello, {user.name}</Nav.Link>
            <Nav.Link onClick={handleLogout} className='fs-4' >Logout</Nav.Link>
            
             </>
            )}
            
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;