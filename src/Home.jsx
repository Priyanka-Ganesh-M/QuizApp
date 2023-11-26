import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CreateQuizPage from './PostAQuiz';
import NavBar from './Navbar';
import { useParams } from 'react-router-dom';
const HomePage = () => {
  const {id} = useParams()
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/getQuizzes');
      setQuizzes(response.data); // Assuming the response contains an array of quizzes
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  return (
    <div>
    <NavBar id = {id}/>
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          {/* Display Available Quizzes */}
          <Card className="mt-5" style = {{border : 'black', boxShadow: '0 5px 5px rgba(255, 255, 255, 0.1)' }}>
            <Card.Body>
              <Card.Title>Available Quizzes</Card.Title>
              {quizzes.map((quiz) => (
                <div key={quiz._id} className="mb-3">
                  <h5>{quiz.title}</h5>
                  <Link to={`/quiz/${quiz._id}/${id}`}><Button variant="tertiary">Start Quiz</Button></Link>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CreateQuizPage/>
    </Container>
    </div>
  );
};

export default HomePage;
