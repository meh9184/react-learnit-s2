import React from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';

import Button from '../../components/Button';

class PostCreate extends React.Component {

  state = {
    author: '',
    title: '',
    content: ''
  }

  handleChange = (type) => (e) => {
    this.setState({
      [type]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const confirm = window.confirm('정말로 등록하시겠습니까?');

    if (confirm) {
      const { boardId } = this.props.match.params;
      const { author, title, content } = this.state;
  
      const newPostRef = db.collection('posts').doc();
      
      await newPostRef.set({
        id: newPostRef.id,
        author,
        title,
        content,
        comments: []
      });
  
      const boardSnapshot = await db.collection('boards').doc(boardId).get();
      const postsByBoard = boardSnapshot.data().posts;
      await db.collection('boards').doc(boardId).update({
        posts: [
          ...postsByBoard,
          newPostRef.id
        ]
      });
  
      alert('성공적으로 등록되었습니다');
      this.props.history.goBack();
    }
  }

  render() {
    const { author, title, content } = this.state;
    return (
      <Wrapper>
        <Form>
          <Nickname>
            <Label>닉네임</Label>
            <Input value={author} onChange={this.handleChange('author')} />
          </Nickname>
          <Title>
            <Label>제목</Label>
            <Input value={title} onChange={this.handleChange('title')} />
          </Title>
          <Content>
            <Label>내용</Label>
            <Textarea value={content} onChange={this.handleChange('content')} />
          </Content>
          <Button onClick={this.handleSubmit}>글 쓰기</Button>
        </Form>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  padding: 5rem 4rem;
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #fff;
`;

const Form = styled.form`
  text-align: center;
`;

const Nickname = styled.div`
  margin-bottom: 4rem;
`;

const Title = styled.div`
  margin-bottom: 4rem;
`;

const Content = styled.div`
  margin-bottom: 4rem;
`;

const Label = styled.div`
  text-align: left;
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  font-family: 'NanumSquare';
  box-sizing : border-box;
  height: 4rem;
  width: 100%;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 3px;
  padding: 0rem;
  padding-left: 1rem;
  font-size: 1.6rem;
  color: #333;
`;

const Textarea = styled.textarea`
  resize: none;
  font-family: 'NanumSquare';
  box-sizing : border-box;
  width: 100%;
  height: 15rem;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 3px;
  font-size: 1.6rem;
  color: #333;
  padding: 1rem;
`;

export default PostCreate;