import {render, screen} from '@testing-library/react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

test('renders app brand name', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const brand = screen.getByText(/digitale zorgdesk/i);
  expect(brand).toBeInTheDocument();
});
