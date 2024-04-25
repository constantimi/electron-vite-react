/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable import/order */
/* eslint-disable import/first */
import { useSelectorMock } from '../../../../../shared/hooks/__mocks__/useSelectorMock';

jest.mock('../../../../../shared/store/hooks', () => {
  const originalModule = jest.requireActual(
    '../../../../../shared/store/hooks'
  );
  return {
    ...originalModule,
    useAppDispatch: jest.fn(),
  };
});

import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useAppDispatch } from '../../../../../shared/store/hooks';
import {
  handleLoginState,
  loginEmailSelector,
  loginThunkStatusSelector,
} from '../../../../store/login/entities/login-slices';
import LoginForm from '../LoginForm';
import { Provider } from 'react-redux';
import { configureAppStore } from '../../../../../shared/store/store';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Test for the Login form', () => {
  const mockStore = configureAppStore();

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should handle form submission', async () => {
    const mockDispatch = jest.fn();
    const mockEmail = 'test@example.com';

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    useSelectorMock.mockImplementation((selector) => {
      if (selector === loginThunkStatusSelector) {
        return {
          statusCode: 200,
          errMessage: null,
        };
      }

      if (selector === loginEmailSelector) {
        return {
          email: mockEmail,
        };
      }
      return null;
    });

    render(
      <Provider store={mockStore}>
        <LoginForm />
      </Provider>
    );

    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: mockEmail } });

    const loginButton = screen.getByTestId('login');
    fireEvent.click(loginButton);

    expect(mockDispatch).toHaveBeenCalledWith(handleLoginState);

    expect(mockUseNavigate).toHaveBeenCalledWith('/login');
  });

  it('should handle form submission with error', async () => {
    const mockDispatch = jest.fn();
    const mockErrorMessage = 'Invalid email';
    const mockEmail = 'test@example.com';

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    useSelectorMock.mockImplementation((selector) => {
      if (selector === loginThunkStatusSelector) {
        return {
          statusCode: 400,
          errMessage: mockErrorMessage,
        };
      }

      if (selector === loginEmailSelector) {
        return {
          email: mockEmail,
        };
      }
      return null;
    });

    render(
      <Provider store={mockStore}>
        <LoginForm />
      </Provider>
    );

    const loginButton = screen.getByTestId('login');
    fireEvent.click(loginButton);

    expect(mockDispatch).toHaveBeenCalledWith(handleLoginState);
  });

  it('should handle Enter keydown event', async () => {
    const mockDispatch = jest.fn();
    const mockEmail = 'test@example.com';

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    useSelectorMock.mockImplementation((selector) => {
      if (selector === loginThunkStatusSelector) {
        return {
          statusCode: 200,
          errMessage: null,
        };
      }

      if (selector === loginEmailSelector) {
        return {
          email: mockEmail,
        };
      }
    });

    render(
      <Provider store={mockStore}>
        <LoginForm />
      </Provider>
    );

    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: mockEmail } });

    fireEvent.keyDown(emailInput, {
      key: 'Enter',
      code: 'Enter',
    });

    expect(mockDispatch).toHaveBeenCalledWith(handleLoginState);
    expect(mockUseNavigate).toHaveBeenCalledWith('/login');
  });

  it('should handle form submission with not confirm email', async () => {
    const mockDispatch = jest.fn();
    const mockErrorMessage = 'Please confirm your email before logging in';
    const mockEmail = 'test@example.com';

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    useSelectorMock.mockImplementation((selector) => {
      if (selector === loginThunkStatusSelector) {
        return {
          statusCode: 409,
          errMessage: mockErrorMessage,
        };
      }

      if (selector === loginEmailSelector) {
        return {
          email: mockEmail,
        };
      }
      return null;
    });

    render(
      <Provider store={mockStore}>
        <LoginForm />
      </Provider>
    );

    const loginButton = screen.getByTestId('login');
    fireEvent.click(loginButton);

    expect(mockDispatch).toHaveBeenCalledWith(handleLoginState);
  });
});
