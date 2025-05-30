import React, { useState } from 'react';
import { Form, Button, Card, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await axios.post('https://contact-book-app-backend.onrender.com/api/auth/register', {
        name, email, password, confirmPassword
      });
      toast.success('Registered successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
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
            <h2 className="text-center mb-4 fs-1" style={{ fontWeight: 'bold', color: '#333' }}>Register</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fs-4" style={{ fontWeight: 600, color: '#555' }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ padding: '10px 15px', fontSize: '16px' }}
                  className="fs-4"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fs-4" style={{ fontWeight: 600, color: '#555' }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: '10px 15px', fontSize: '16px' }}
                  className="fs-4"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fs-4" style={{ fontWeight: 600, color: '#555' }}>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ borderRadius: '12px 0 0 12px', padding: '10px 15px', fontSize: '16px' }}
                    className="fs-4"
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

              <Form.Group className="mb-4">
                <Form.Label className="fs-4" style={{ fontWeight: 600, color: '#555' }}>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ borderRadius: '12px 0 0 12px', padding: '10px 15px', fontSize: '16px' }}
                    className="fs-4"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={toggleConfirmPasswordVisibility}
                    type="button"
                    style={{ borderRadius: '0 12px 12px 0' }}
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button
                type="submit"
                className="w-100"
                disabled={loading}
                style={{
                  borderRadius: '12px',
                  padding: '10px',
                  fontWeight: 600,
                  backgroundColor: '#007bff',
                  border: 'none'
                }}
              >
                {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Register;
