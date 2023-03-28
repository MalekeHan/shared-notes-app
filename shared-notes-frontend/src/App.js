import React, { useState } from 'react';
import { saveNote, generateSummary } from './api/notesApi';
import './App.css';
import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';


function App() {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState(null);
  const [summary, setSummary] = useState('');

  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  const handleSaveNote = async () => {
    const response = await saveNote(note);
    console.log('Note saved:', response);
    setSavedNote(response);
  };

  const handleGenerateSummary = async () => {
    console.log('Input note:', note);
    const response = await generateSummary(note);
    console.log('Generated summary:', response);
    setSummary(response);
  };
  

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <h1 className="text-center mb-4">Shared Notes App</h1>
          <Form>
            <Form.Group controlId="noteTextarea">
              <Form.Control
                as="textarea"
                rows={10}
                value={note}
                onChange={handleInputChange}
                placeholder="Enter your note here..."
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button className="mr-2" variant="primary" onClick={handleSaveNote}>
                Save Note
              </Button>
              <Button variant="success" onClick={handleGenerateSummary}>
                Generate Summary
              </Button>
            </div>
          </Form>
          {savedNote && (
            <Card className="mt-4">
              <Card.Header>Saved Note</Card.Header>
              <Card.Body>
                <Card.Text>{savedNote.content}</Card.Text>
              </Card.Body>
            </Card>
          )}
          {summary && (
            <Card className="mt-4">
              <Card.Header>Summary</Card.Header>
              <Card.Body>
                <Card.Text>{summary.completion}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
