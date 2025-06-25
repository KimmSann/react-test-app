import { Form, Button } from 'react-bootstrap';
import { CustomCard,CustomContainer } from '../components/Styles';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';

import { Context } from '../index';
import { useContext } from 'react';


const BoardRegister = () => {
  
  const token = useSelector((state) => state.member.token);
  
  const navigate = useNavigate();

  const [board, setBoard] = useState({});


const { host } = useContext(Context);



const handleChange = (e) => {
  const { name, value, files } = e.target;

  let newBoard = { ...board };

  if(name === 'uploadFile'){
    newBoard[name] = files[0]
  } else {
    newBoard[name] = value;
  }
      
  setBoard(newBoard);
};

const handleSubmit = async (e) => {
  
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", board.title);
  formData.append("content", board.content);
  formData.append("uploadFile", board.uploadFile);


  const response = await axios.post(
    
    `${host}/board/register`,
   
    formData,
    {
      headers: {
      Authorization: token
    }
  });

  if (response.status === 201) {
    navigate('/board/list');
  } else {
    throw new Error(`api error: ${response.status} ${response.statusText}`);
  }

};

  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 등록</h3>
        <form onSubmit={handleSubmit}>
        <Form.Group controlId="board.title">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" name="title" onChange={handleChange}></Form.Control>
        </Form.Group>
        <Form.Group controlId="board.content">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={3} name="content" onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="board.uploadFile">
          <Form.Label>이미지</Form.Label>
          <Form.Control type="file" multiple name="uploadFile" onChange={handleChange}/>
        </Form.Group>
        <Button variant="secondary" type='submit'>등록</Button>
        </form>
      </CustomContainer>
    </CustomCard>
  );
}

export default BoardRegister