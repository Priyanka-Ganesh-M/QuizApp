import React, { useState } from 'react';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './paq.css'
const CreateQuizPage = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', options: [{ id: 0, text: '' }, { id: 1, text: '' }, { id: 2, text: '' }, { id: 3, text: '' }], correctOption: { id: 0, text: '' } }
  ]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];

    if (field === 'correctOption') {
      const selectedOption = newQuestions[index].options.find(option => option.id === value);
      newQuestions[index][field] = selectedOption;
    } else {
      newQuestions[index][field] = value;
    }

    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', options: [{ id: 0, text: '' }, { id: 1, text: '' }, { id: 2, text: '' }, { id: 3, text: '' }], correctOption: { id: 0, text: '' } }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // Implement logic to handle the submitted quiz data
    console.log('Submitted Quiz:', { quizTitle, questions });
    await axios.post('http://localhost:4000/postQuiz', { title: quizTitle, questions: questions }, { headers: { 'Content-Type': 'application/json' } }).then((response) => { console.log(response.data) });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="mt-5" style = {{border : 'black', boxShadow: '0 5px 5px rgba(255, 255, 255, 0.1)'}}>
            <Card.Body>
              <Card.Title>Create a Quiz</Card.Title><br/>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="quizTitle">
                  <Form.Label>Quiz Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter quiz title"
                    value={quizTitle}
                    className="bg-dark text-white"
                    onChange={(e) => setQuizTitle(e.target.value)}
                  />
                </Form.Group><br/>

                {questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <Form.Group controlId={`questionText${index}`}>
                      <Form.Label>Question {index + 1}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter question"
                        value={question.text}
                        className="bg-dark text-white"
                        onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                      /><br/>
                    </Form.Group>

                    <Form.Group controlId={`options${index}`}>
                      <Form.Label>Options</Form.Label>
                      {question.options.map((option) => (
                        <Form.Control
                          key={option.id}
                          className="bg-dark text-white"
                          type="text"
                          placeholder={`Option ${option.id + 1}` }
                          value={option.text}
                          onChange={(e) => handleQuestionChange(index, 'options', [...question.options.slice(0, option.id), { id: option.id, text: e.target.value }, ...question.options.slice(option.id + 1)])}
                        />
                      ))}
                    </Form.Group><br/>

                    <Form.Group controlId={`correctOption${index}`}>
                      <Form.Label>Correct Option</Form.Label>
                      <Form.Control
                        as="select"
                        className="bg-dark text-white"
                        value={question.correctOption.id}
                        onChange={(e) => handleQuestionChange(index, 'correctOption', parseInt(e.target.value, 10))}
                      >
                        {question.options.map((option) => (
                          <option key={option.id} value={option.id}>{`Option ${option.id + 1}`}</option>
                        ))}
                      </Form.Control><br/>
                    </Form.Group>

                    <Button variant="tertiary" onClick={() => handleRemoveQuestion(index)}>Remove Question</Button>
                  </div>
                ))}

                <div className = 'flex-container'>
                <Button variant="tertiary" onClick={handleAddQuestion}>Add Question</Button>&nbsp;&nbsp;
                <Button variant="tertiary" type="submit">
                  Create Quiz
                </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateQuizPage;
