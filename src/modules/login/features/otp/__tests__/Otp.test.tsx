// eslint-disable-next-line import/order
import useQueryParamsMock from '../../../../shared/hooks/__mocks__/useQueryParamsMock';

import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, within } from '@testing-library/react';
import { configureAppStore } from '../../../../shared/store/store';
import Otp from '../Otp';

jest.mock('../../../../shared/hooks/useQueryParams', () => ({
  useQueryParams: useQueryParamsMock,
}));

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Otp', () => {
  const mockStore = configureAppStore();

  it('renders Otp component with LoginLayout and OtpForm', () => {
    const mockEmail = 'test@example.com';
    const mockOtp = '123456';

    useQueryParamsMock.mockReturnValueOnce({
      get: jest
        .fn()
        .mockReturnValueOnce(mockEmail)
        .mockReturnValueOnce(mockOtp),
    });

    render(
      <Provider store={mockStore}>
        <Otp />
      </Provider>
    );

    // Assert the presence of LoginLayout component
    const loginLayout = screen.getByTestId('layout');
    expect(loginLayout).toBeInTheDocument();

    // Assert the presence of OtpForm component
    const otpClipboard = within(loginLayout).getByTestId('clipboard');
    expect(otpClipboard).toBeInTheDocument();
  });
});
