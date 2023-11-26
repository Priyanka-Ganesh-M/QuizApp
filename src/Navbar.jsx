import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function NavBar(props) {
    const {id} = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    async function handleSearch(e){
        e.preventDefault();

        await axios.get(`http://localhost:4000/quiz/${searchTerm}`).then((response)=>{
            console.log(response.data)
            if(response != null)
            {const quizId = response.data.id;
            window.location.href = `/quiz/${quizId}/${id}`;}
            else
            {
                window.location.href = `/home/${id}`;
            }
            })
        }
    
  return (
    
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href={`/home/${props.id}`}>Quiz</Navbar.Brand>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <Nav className="me-auto">
            <Nav.Link href={`/home/${props.id}`}>Home</Nav.Link>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
            type="text"
            placeholder="Enter quiz name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            /> &nbsp; &nbsp;
            <Button variant="tertiary" type="submit" className="ml-2" style = {{backgroundColor : 'green'}}>
            Search
            </Button>
            </Form>
            </Nav>
        </Container>
      </Navbar>
      
  );
}

export default NavBar;