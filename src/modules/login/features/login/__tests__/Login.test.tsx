import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, within } from '@testing-library/react';
import { configureAppStore } from '../../../../shared/store/store';
import Login from '../Login';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Login component', () => {
  const mockStore = configureAppStore();

  it('should render the login form within the login layout', () => {
    render(
      <Provider store={mockStore}>
        <Login />
      </Provider>
    );

    // Check if the LoginLayout component is rendered
    const loginLayout = screen.getByTestId('layout');
    expect(loginLayout).toBeInTheDocument();

    // Check if the LoginForm component is rendered within the LoginLayout component
    const innerContainer = within(loginLayout).getByTestId(
      'center-inner-container'
    );
    expect(innerContainer).toBeInTheDocument();
  });
});
