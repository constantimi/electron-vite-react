import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import LoginLayout from '../LoginLayout';
import { configureAppStore } from '../../../shared/store/store';

describe('LoginLayout component', () => {
  const mockStore = configureAppStore();

  it('should render the children wrapped in Layout and Content components', () => {
    render(
      <Provider store={mockStore}>
        <LoginLayout>
          <div>Child Component</div>
        </LoginLayout>
      </Provider>
    );

    // Check if the LoginLayout component is rendered
    const loginLayout = screen.getByTestId('layout');
    expect(loginLayout).toBeInTheDocument();

    // Check if the child component is rendered within the Content component
    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });
});
