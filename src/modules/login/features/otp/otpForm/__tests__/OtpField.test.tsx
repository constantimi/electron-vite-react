import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import OtpField from '../OtpField';
import { configureAppStore } from '../../../../../shared/store/store';

describe('OtpField component', () => {
  const handleKeyUp = jest.fn();
  const mockStore = configureAppStore();

  it('should render the OtpField component with the provided value', () => {
    const otpValue = '1234';

    render(
      <Provider store={mockStore}>
        <OtpField val={otpValue} onKeyUp={handleKeyUp} name="otp" />
      </Provider>
    );

    const otpInput = screen.getByRole('textbox') as HTMLInputElement;

    expect(otpInput).toBeInTheDocument();
    expect(otpInput.value).toBe(otpValue);
  });

  it('should call the onKeyUp function when a key is released in the input', () => {
    const otpValue = '1234';

    render(
      <Provider store={mockStore}>
        <OtpField val={otpValue} onKeyUp={handleKeyUp} name="otp" />
      </Provider>
    );

    const otpInput = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.keyUp(otpInput, { key: 'Enter', code: 'Enter' });

    expect(handleKeyUp).toHaveBeenCalled();
  });
});
