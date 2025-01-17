import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

interface Props {
  label: string;
  onClick?: () => void;
}

const ForwardedComponent = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { label, onClick } = props;
  
  return (
    <div ref={ref} onClick={onClick}>
      {label}
    </div>
  );
});

describe('Usability Tests', () => {
  it('renders forwarded component correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ForwardedComponent ref={ref} label="Test Label" />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
});

export default ForwardedComponent; 