import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const ChatAI = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'ai', text: `You said: "${input}"` }
      ]);
    }, 500);
    setInput('');
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 600 }}>
      <Card>
        <Card.Header as="h5">Chat AI</Card.Header>
        <Card.Body style={{ height: 400, overflowY: 'auto', background: '#f8f9fa' }}>
          {messages.map((msg, idx) => (
            <Row key={idx} className="mb-2">
              <Col
                xs={msg.sender === 'user' ? { span: 8, offset: 4 } : 8}
                className={msg.sender === 'user' ? 'text-end' : 'text-start'}
              >
                <span
                  className={`p-2 rounded d-inline-block ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-light'
                  }`}
                >
                  {msg.text}
                </span>
              </Col>
            </Row>
          ))}
          <div ref={messagesEndRef} />
        </Card.Body>
        <Card.Footer>
          <Form onSubmit={handleSend} className="d-flex">
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <Button type="submit" variant="primary" className="ms-2">
              Send
            </Button>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ChatAI;