import React, { useState } from 'react';
import { Form, Button, Card, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [Loading , setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://contact-book-app-backend.onrender.com/api/auth/login', { email, password });
      login(res.data.user, res.data.token);
      toast.success('Login successful! Redirecting...', {
     autoClose: 2000,
     pauseOnHover: true,
     onClose: () => navigate('/')
});
    } catch (err) {
      toast.error('Invalid email or password', { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: '100vh',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }}
      >
        <Card style={{ maxWidth: '600px', width: '100%', padding: '30px', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)' }}>
          <Card.Body>
            <h2 className="text-center mb-4 fs-1" style={{ fontWeight: 'bold', color: '#333' }}>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 600, color: '#555' }} className='fs-4'>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: '10px 15px', fontSize: '16px' }}
                  className='fs-4 border-bottom'
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 600, color: '#555' }} className='fs-4'>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ borderRadius: '12px 0 0 12px', padding: '10px 15px', fontSize: '16px' }}
                    className='fs-4'
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                    type="button"
                    style={{ borderRadius: '0 12px 12px 0' }}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </Button>
                </InputGroup>
              </Form.Group>
              <Button
                type="submit"
                className="w-100"
                disabled={Loading}
                style={{
                  borderRadius: '12px',
                  padding: '10px',
                  fontWeight: 600,
                  backgroundColor: '#007bff',
                  border: 'none'
                }}
              >
                {Loading ? <Spinner animation="border" size="sm" /> : 'Login'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;
