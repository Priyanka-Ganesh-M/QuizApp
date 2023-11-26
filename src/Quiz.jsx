import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Container, Row, Col ,Form , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NavBar from './Navbar';

const Quiz = () => {
  const {quizId,id} = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions =() => {
      try {
         axios.get(`http://localhost:4000/getQuiz/${quizId}`).then((response)=>{
          setQuestions(response.data); 
         });
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
   
  }, [quizId]);

  

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setSelectedOption(null);
    try {
      console.log(question._id)
      axios.get(`http://localhost:4000/getQuizzes/${question._id}`).then((response)=>{
       setOptions(response.data); 
      });
   } catch (error) {
     console.error('Error fetching questions:', error);
   }
  };

  const handleOptionChange = (optionId) => {
    setUserAnswers((prevUserAnswers) => {
      const existingAnswerIndex = prevUserAnswers.findIndex(
        (answer) => answer.questionId === selectedQuestion._id
      );
  
      if (existingAnswerIndex !== -1) {
        // If an answer for the current question already exists, update it
        const updatedAnswers = [...prevUserAnswers];
        updatedAnswers[existingAnswerIndex] = {
          questionId: selectedQuestion._id,
          selectedOption: optionId,
        };
        return updatedAnswers;
      } else {
        // If there is no existing answer, add a new one
        return [...prevUserAnswers, { questionId: selectedQuestion._id, selectedOption: optionId }];
      }
    });
  
    setSelectedOption(optionId);
  };
  
  const handleNextClick = () => {
    // No need to append a new answer here, as it's handled in handleOptionChange
    const nextQuestionIndex = questions.findIndex((q) => q._id === selectedQuestion._id) + 1;
  
    // Move to the next question or calculate the result if it's the last question
    if (nextQuestionIndex < questions.length) {
      // Move to the next question
      handleQuestionClick(questions[nextQuestionIndex]);
    } else {
      // Calculate the result
      calculateResult();
    }
  };
  
  
  
  
  
  
  
  

  async function calculateResult() {
    // Implement your logic to calculate the result based on userAnswers
    // This is a simple example; replace it with your own scoring logic
    console.log('User Answers:', userAnswers);
    await axios.post(`http://localhost:4000/result`,{userAnswers: userAnswers},{headers: {
      'Content-Type': 'application/json'}
    }).then((response)=>
    {
      const res = response.data.result;
      const totQ = questions.length;
      window.location.href = `/result/${totQ}/${res}/${id}`;
    }
    );
    

    // Here, you can redirect to the result page or display the result in some way
  };
  return (
    <div>
    <NavBar id = {id}/>
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          {/* Display Question Links on the Left Side */}
          <Card className="mt-5" style = {{border : 'black', boxShadow : '0 5px 5px rgba(255, 255, 255, 0.1)'}}>
            <Card.Body>
              <Card.Title>Question List</Card.Title>
              <ul>
                {questions.map((question,index) => (
                  <li key = {index} id={index}>
                    <Link  onClick={() => handleQuestionClick(question)} style = {{textDecoration:'none'}}>
                      {`Question ${index+1}`}
                    </Link>
                  </li>
                ))}
              </ul>
              <p>Click on any question to start answering...</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          {/* Display Detailed Question on the Right Side */}
          {selectedQuestion && (
            <Card className="mt-5" style = {{border : 'black', boxShadow : '0 5px 5px rgba(255, 255, 255, 0.1)'}}>
              <Card.Body >
                <Card.Title>{`Question`}</Card.Title>
                <Card.Text>{selectedQuestion.question}</Card.Text>
               
                <Form>
                  {options.map((option,ind) => (
                    <Form.Check
                      id={ind+1} key = {ind+1}
                      type="radio"
                      label={option.option}
                      name="options"
                      checked={selectedOption === option._id}
                      onChange={() => handleOptionChange(option._id)}
                    />
                  ))}
                </Form>

                <Button variant="tertiary" onClick={handleNextClick}>
                  {selectedQuestion._id === questions[questions.length - 1]._id ? 'Submit' : 'Next'}
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Quiz;
