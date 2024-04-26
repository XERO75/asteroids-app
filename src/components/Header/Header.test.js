/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('renders correctly', () => {
    render(<Header />);

    // Check if the header element is in the document
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    // Check the text content
    const textElement = screen.getByText('BACKEND MINER');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass('text-sm');
  });
});
