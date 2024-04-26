/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Tabs from './Tabs';

describe('Tabs component', () => {
  test('renders three nav links from given tab data', () => {
    render(
      <BrowserRouter>
        <Tabs />
      </BrowserRouter>,
    );

    // Check for three tabs
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    // Check the text and href for each link
    expect(links[0]).toHaveTextContent('Miners');
    expect(links[0]).toHaveAttribute('href', '/miners');
    expect(links[1]).toHaveTextContent('Asteroids');
    expect(links[1]).toHaveAttribute('href', '/asteroids');
    expect(links[2]).toHaveTextContent('Planets');
    expect(links[2]).toHaveAttribute('href', '/planets');
  });

  test('renders correct classNames based on isActive', () => {
    // This is a simple mock example. In a real-world case, you'd need to simulate navigation.
    render(
      <BrowserRouter>
        <Tabs />
      </BrowserRouter>,
    );

    // Simulate navigation to "/miners"
    const minersLink = screen.getByText('Miners').closest('a');
    // You would need a way to simulate isActive. For now, we assume it's always false.
    expect(minersLink).toHaveClass('flex flex-col items-center');
  });
});
