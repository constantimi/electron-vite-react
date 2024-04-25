import React, { ChangeEvent, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginButton from '../../../components/buttons/LoginButton';
import Form from '../../../components/form/Form';
import Field from '../../../components/form/Field';
import Center from '../../../layout/Center';
import AppIcon from '../../../../shared/components/app/AppIcon';
import { useAppDispatch, useAppSelector } from '../../../../shared/store/hooks';
import {
  activeTabSelector,
  handleLoginState,
  loginThunkStatusSelector,
  resetRequestStatus,
  setActiveTab,
  setErrMessage,
  setLoginQueryVariables,
  tabsStateSelector,
} from '../../../store/login/entities/login-slices';
import { useLoginTranslation } from '../../../hooks/useLoginTranslation';
import isEmailValid from '../../../../shared/helpers/validateEmail';
import toast from '../../../../shared/components/toast/AppToast';
import {
  getAuthStatusSelector,
  resetAuthResponse,
} from '../../../../shared/store/app/auth/auth-slice';
import { getTheme } from '../../../../shared/store/app/theme';
import Tab from '../../../components/tab/Tab';
import { TabNames } from '../../../types/enum';

const LoginForm = () => {
  // =====================================================================
  // states

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useLoginTranslation();

  const theme = useAppSelector(getTheme);

  const tabs = useAppSelector(tabsStateSelector);
  const activeTab = useAppSelector(activeTabSelector);

  const { authCode, authLoading } = useAppSelector(getAuthStatusSelector);
  const status = useAppSelector(loginThunkStatusSelector);

  // =====================================================================
  // effect

  useEffect(() => {
    if (authLoading) return;

    if (!status.loading) {
      if (status.code === 200 && !status.msg) {
        const nextPath = new URLSearchParams(location.search).get('next');
        navigate(
          `/login${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ''}`
        );
        if (authCode !== -1) {
          dispatch(resetAuthResponse);
        }
      } else if (status.code === 409) {
        toast.warning({
          title: t('Please confirm your email before logging in'),
        });
        dispatch(resetRequestStatus);
      } else if (status.msg) {
        dispatch(resetRequestStatus);
      }
    }
  }, [
    status.code,
    status.msg,
    status.loading,
    navigate,
    t,
    dispatch,
    authLoading,
    authCode,
    location.search,
    activeTab,
  ]);

  // =====================================================================
  // handle
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;

    if (isEmailValid(email)) {
      dispatch(setErrMessage(''));
      dispatch(setLoginQueryVariables(email));
    }
  };

  const handleSubmit = async () => {
    dispatch(resetRequestStatus());
    dispatch(handleLoginState);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(resetRequestStatus());
      dispatch(handleLoginState);
    }
  };

  const handleActiveTab = (tab: TabNames) => {
    dispatch(resetRequestStatus());
    dispatch(setActiveTab(tab));
  };

  return (
    <Center>
      <div className="mb-8 flex flex-row items-center justify-center gap-2">
        <AppIcon className="h-[45px] w-[200px]" />
      </div>

      <Form className="w-full flex-col">
        <div
          className="my-4 grid w-full grid-cols-2 rounded-lg"
          style={{
            background: theme.background.activeTab,
          }}
        >
          {Object.keys(tabs).map((tab) => (
            <Tab
              key={nanoid()}
              active={tabs[tab as TabNames].active}
              onClick={() => handleActiveTab(tab as TabNames)}
            >
              {t(tab)}
            </Tab>
          ))}
        </div>

        <Field
          dataTestId="email"
          placeholder={t('Enter email address')}
          onChange={handleOnChange}
          errorMessage={
            status.msg === 'badRequest' || status.msg === 'unauthorized'
              ? activeTab === TabNames.Login
                ? t('Login failed')
                : t('Signup failed')
              : status.code !== 409
              ? status.msg === 'internalServerError'
                ? activeTab === TabNames.Login
                  ? t('Login failed')
                  : t('Signup failed')
                : t(status.msg)
              : undefined
          }
          label={t('Email')}
          onKeyDown={handleKeyDown}
          disabled={authLoading}
        />
      </Form>
      <LoginButton
        dataTestId="login"
        className="text-md"
        onClick={handleSubmit}
        placeholder={t(activeTab)}
        isLoading={status.loading || authLoading}
      />
    </Center>
  );
};

export default LoginForm;
