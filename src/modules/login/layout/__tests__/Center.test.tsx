import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Center from '../Center';
import { configureAppStore } from '../../../shared/store/store';

describe('Center component', () => {
  const mockStore = configureAppStore();
  it('should render the children components wrapped in the center container', () => {
    render(
      <Provider store={mockStore}>
        <Center>
          <div>Child Component 1</div>
          <div>Child Component 2</div>
        </Center>
      </Provider>
    );

    const outerContainer = screen.getByTestId('center-outer-container');
    expect(outerContainer).toBeInTheDocument();

    const innerContainer = screen.getByTestId('center-inner-container');
    expect(innerContainer).toBeInTheDocument();

    const childComponent1 = screen.getByText('Child Component 1');
    expect(childComponent1).toBeInTheDocument();

    const childComponent2 = screen.getByText('Child Component 2');
    expect(childComponent2).toBeInTheDocument();
  });
});
