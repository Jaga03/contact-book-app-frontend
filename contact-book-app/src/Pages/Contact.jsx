import React, { useState, useEffect } from 'react';
import {
  Table, Button, Form, Modal, Container, Spinner, Alert
} from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Contacts = () => {
  const { token } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', notes: '', id: null });

  useEffect(() => {
    if (token) fetchContacts();
  }, [token]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://contact-book-app-backend.onrender.com/api/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(res.data.contacts);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch contacts');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (contact.id) {
        await axios.put(`https://contact-book-app-backend.onrender.com/api/contacts/${contact.id}`, contact, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('https://contact-book-app-backend.onrender.com/api/contacts', contact, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchContacts();
      setShow(false);
      setContact({ name: '', email: '', phone: '', notes: '', id: null });
    } catch (err) {
      setError('Failed to save contact');
    }
  };

  const handleEdit = (c) => {
    setContact({ ...c, id: c._id });
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://contact-book-app-backend.onrender.com/api/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchContacts();
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  if (!token) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Please login to access contacts.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 className="mb-4 fw-bold text-center fs-1">Your Contacts</h2>

      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="primary"
          style={{ borderRadius: '8px', fontWeight: '500' }}
          onClick={() => {
            setContact({ name: '', email: '', phone: '', notes: '', id: null });
            setShow(true);
          }}
        >
          + Add Contact
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Notes</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.notes}</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold">{contact.id ? 'Edit Contact' : 'Add Contact'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Name</Form.Label>
              <Form.Control
                placeholder="Enter name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Phone</Form.Label>
              <Form.Control
                placeholder="Enter phone number"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Additional notes"
                value={contact.notes}
                onChange={(e) => setContact({ ...contact, notes: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button
            variant="success"
            onClick={handleSave}
            style={{ fontWeight: 500 }}
          >
            {contact.id ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Contacts;
