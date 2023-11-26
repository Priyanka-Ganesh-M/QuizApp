import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Navbar';

const Result = () => {
  const {totQ, result,id } = useParams();



  return (
    <div>
    <NavBar id = {id}/>
    <Container>
      <Card className="mt-5" style = {{border : 'black', boxShadow : '0 5px 5px rgba(255, 255, 255, 0.1)'}}>
        <Card.Body>
          <Card.Title>Quiz Result</Card.Title>
          {result !== null ? (
            <Card.Text>{`You scored ${result} out of ${totQ}.`}</Card.Text>
          ) : (
            <Card.Text>Loading result...</Card.Text>
          )}
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
};

export default Result;
