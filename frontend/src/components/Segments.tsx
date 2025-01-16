import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 20px;
`;

const Segments: React.FC = () => {
  return (
    <Container>
      <Title>Myセグメント一覧</Title>
      {/* TODO: セグメント一覧の実装 */}
    </Container>
  );
};

export default Segments; 