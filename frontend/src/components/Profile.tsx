import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 20px;
`;

const Form = styled.form`
  max-width: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const Profile: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 体重更新の実装
  };

  return (
    <Container>
      <Title>プロフィール設定</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="weight">体重 (kg)</Label>
          <Input
            type="number"
            id="weight"
            step="0.1"
            min="30"
            max="150"
            required
          />
        </FormGroup>
        <Button type="submit">更新</Button>
      </Form>
    </Container>
  );
};

export default Profile; 