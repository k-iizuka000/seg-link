import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { stravaApiClient, updateProfile } from '../api/client';

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

interface StravaProfile {
  firstname: string;
  lastname: string;
  sex: string;
}

const Profile: React.FC = () => {
  const [stravaProfile, setStravaProfile] = useState<StravaProfile | null>(null);

  useEffect(() => {
    const fetchStravaProfile = async () => {
      try {
        const response = await stravaApiClient.get('/athlete');
        setStravaProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch Strava profile:', error);
      }
    };

    fetchStravaProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat((document.getElementById('weight') as HTMLInputElement).value);
    try {
      const response = await updateProfile('your_access_token_here', { weight });
      console.log('Profile updated:', response);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <Container>
      <Title>プロフィール設定</Title>
      {stravaProfile && (
        <div>
          <h2>Stravaプロフィール</h2>
          <p>名前: {stravaProfile.firstname} {stravaProfile.lastname}</p>
          <p>性別: {stravaProfile.sex}</p>
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="weight" aria-label="体重 (kg)">体重 (kg)</Label>
          <Input
            type="number"
            id="weight"
            step="0.1"
            min="30"
            max="150"
            required
            aria-required="true"
            aria-describedby="weight-description"
          />
          <p id="weight-description" className="sr-only">体重を入力してください。30kgから150kgの範囲で入力可能です。</p>
        </FormGroup>
        <Button type="submit">更新</Button>
      </Form>
    </Container>
  );
};

export default Profile; 