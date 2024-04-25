/* eslint-disable import/first */
/* eslint-disable import/order */
import useQueryParamsMock from '../../../../../shared/hooks/__mocks__/useQueryParamsMock';
import { useSelectorMock } from '../../../../../shared/hooks/__mocks__/useSelectorMock';
import { toastMock } from '../../../../../shared/__mocks__/toastMock';

jest.mock('../../../../../shared/store/hooks', () => {
  const originalModule = jest.requireActual(
    '../../../../../shared/store/hooks'
  );
  return {
    ...originalModule,
    useAppDispatch: jest.fn(),
  };
});

jest.mock('../../../../../shared/hooks/useQueryParams', () => ({
  useQueryParams: useQueryParamsMock,
}));

import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import OtpForm from '../OtpForm';
import { configureAppStore } from '../../../../../shared/store/store';
import {
  getOtpSelector,
  otpCurrentRefSelector,
  otpThunkStatusSelector,
} from '../../../../store/otp/entities/otp-slices';
import { useAppDispatch } from '../../../../../shared/store/hooks';
import { loginEmailSelector } from '../../../../store/login/entities/login-slices';
import { useNavigate } from 'react-router';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('OtpForm component', () => {
  const mockStore = configureAppStore();

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the OtpForm component with the provided email', () => {
    const mockDispatch = jest.fn();
    const mockEmail = 'test@example.com';
    const loginMockEmail = { email: 'test@example.com' };
    const mockOtp = '123456';

    useQueryParamsMock.mockReturnValueOnce({
      get: jest
        .fn()
        .mockReturnValueOnce(mockEmail)
        .mockReturnValueOnce(mockOtp),
    });

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelectorMock.mockImplementation((selector) => {
      if (selector === otpCurrentRefSelector) {
        return {
          number: 0,
        };
      }

      if (selector === otpThunkStatusSelector) {
        return {
          isLoading: false,
          statusCode: 200,
          errMessage: '',
        };
      }

      if (selector === loginEmailSelector) {
        return loginMockEmail;
      }

      if (selector === getOtpSelector) {
        return ['', '', '', '', '', '', '', ''];
      }

      return null;
    });

    render(
      <Provider store={mockStore}>
        <OtpForm />
      </Provider>
    );

    const emailElement = screen.getByText(mockEmail);
    expect(emailElement).toBeInTheDocument();
  });

  it('should call setOtpQueryVariables on mount if query params are provided', () => {
    const mockDispatch = jest.fn();
    const mockEmail = 'test@example.com';
    const mockOtp = '123456';

    useQueryParamsMock.mockReturnValueOnce({
      get: jest
        .fn()
        .mockReturnValueOnce(mockEmail)
        .mockReturnValueOnce(mockOtp),
    });

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelectorMock.mockImplementation((selector) => {
      if (selector === otpCurrentRefSelector) {
        return {
          number: 0,
        };
      }

      if (selector === otpThunkStatusSelector) {
        return {
          isLoading: false,
          statusCode: 200,
          errMessage: '',
        };
      }

      if (selector === loginEmailSelector) {
        return mockEmail;
      }

      if (selector === getOtpSelector) {
        return ['', '', '', '', '', '', '', ''];
      }

      return null;
    });

    render(
      <Provider store={mockStore}>
        <OtpForm />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should call otpHandleKeyPress on input keyup', () => {
    const mockKeyCode = '1';
    const mockIndex = 1;
    const mockEvent = {
      key: mockKeyCode,
    };

    const mockDispatch = jest.fn();
    const mockEmail = 'test@example.com';
    const mockOtp = '123456';

    useQueryParamsMock.mockReturnValueOnce({
      get: jest
        .fn()
        .mockReturnValueOnce(mockEmail)
        .mockReturnValueOnce(mockOtp),
    });

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelectorMock.mockImplementation((selector) => {
      if (selector === otpCurrentRefSelector) {
        return {
          number: 0,
        };
      }

      if (selector === otpThunkStatusSelector) {
        return {
          isLoading: false,
          statusCode: 200,
          errMessage: '',
        };
      }

      if (selector === loginEmailSelector) {
        return mockEmail;
      }

      if (selector === getOtpSelector) {
        return ['', '', '', '', '', '', '', ''];
      }

      return null;
    });

    render(
      <Provider store={mockStore}>
        <OtpForm />
      </Provider>
    );

    const otpInput = screen.getByTestId(`otp-${mockIndex}`);
    fireEvent.keyUp(otpInput, mockEvent);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it('should call readClipboard on "Plak code" button click', async () => {
    const mockDispatch = jest.fn();
    const mockEmail = 'test@example.com';
    const mockOtp = '123456';

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        readText: jest.fn().mockResolvedValue(mockOtp),
      },
      configurable: true,
    });

    useQueryParamsMock.mockReturnValueOnce({
      get: jest
        .fn()
        .mockReturnValueOnce(mockEmail)
        .mockReturnValueOnce(mockOtp),
    });

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelectorMock.mockImplementation((selector) => {
      if (selector === otpCurrentRefSelector) {
        return {
          number: 0,
        };
      }

      if (selector === otpThunkStatusSelector) {
        return {
          isLoading: false,
          statusCode: 200,
          errMessage: '',
        };
      }

      if (selector === loginEmailSelector) {
        return mockEmail;
      }

      if (selector === getOtpSelector) {
        return ['', '', '', '', '', '', '', ''];
      }

      return null;
    });

    render(
      <Provider store={mockStore}>
        <OtpForm />
      </Provider>
    );

    const clipboardCodeButton = screen.getByTestId('clipboard');
    fireEvent.click(clipboardCodeButton);

    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe(mockOtp);
  });

  it('should call readClipboard on "Plak code" button click, loading state', async () => {
    const mockDispatch = jest.fn();
    const mockEmail = 'test@example.com';
    const mockOtp = '123456';

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        readText: jest.fn().mockResolvedValue(mockOtp),
      },
      configurable: true,
    });

    useQueryParamsMock.mockReturnValueOnce({
      get: jest
        .fn()
        .mockReturnValueOnce(mockEmail)
        .mockReturnValueOnce(mockOtp),
    });

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelectorMock.mockImplementation((selector) => {
      if (selector === otpCurrentRefSelector) {
        return {
          number: 0,
        };
      }

      if (selector === otpThunkStatusSelector) {
        return {
          isLoading: true,
          statusCode: -1,
          errMessage: '',
        };
      }

      if (selector === loginEmailSelector) {
        return mockEmail;
      }

      if (selector === getOtpSelector) {
        return ['', '', '', '', '', '', '', ''];
      }

      return null;
    });

    render(
      <Provider store={mockStore}>
        <OtpForm />
      </Provider>
    );

    const clipboardCodeButton = screen.getByTestId('clipboard-button');
    fireEvent.click(clipboardCodeButton);

    const loadingIcon = screen.getByTestId('loading-icon');
    expect(loadingIcon).toBeInTheDocument();
  });

  it('should display an error toast message on unsuccessful OTP verification', () => {
    const mockErrorMessage = 'Invalid OTP';
    const mockEmail = 'test@example.com';

    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelectorMock.mockImplementation((selector) => {
      if (selector === otpCurrentRefSelector) {
        return {
          number: 0,
        };
      }

      if (selector === otpThunkStatusSelector) {
        return {
          isLoading: false,
          statusCode: 401,
          errMessage: mockErrorMessage,
        };
      }

      if (selector === loginEmailSelector) {
        return mockEmail;
      }

      if (selector === getOtpSelector) {
        return ['', '', '', '', '', '', '', ''];
      }

      return null;
    });

    render(
      <Provider store={mockStore}>
        <OtpForm />
      </Provider>
    );

    mockStore.dispatch({
      type: 'otp/thunkStatus/rejected',
      payload: { message: mockErrorMessage },
    });

    expect(toastMock.error).toHaveBeenCalledWith(mockErrorMessage);
  });

  it('handleReturnToLogin function works correctly', () => {
    const mockEmail = 'test@example.com';

    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelectorMock.mockImplementation((selector) => {
      if (selector === otpCurrentRefSelector) {
        return {
          number: 0,
        };
      }

      if (selector === otpThunkStatusSelector) {
        return {
          isLoading: true,
          statusCode: -1,
          errMessage: '',
        };
      }

      if (selector === loginEmailSelector) {
        return mockEmail;
      }

      if (selector === getOtpSelector) {
        return ['', '', '', '', '', '', '', ''];
      }

      return null;
    });
    render(
      <Provider store={mockStore}>
        <OtpForm />
      </Provider>
    );

    const returnButton = screen.getByTestId('return-button');
    fireEvent.click(returnButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'login/setLoginInitialState',
    });
  });
});
