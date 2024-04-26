import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../shared/store/hooks';
import { Theme } from '../../../../shared/layout/theme';
import { SessionStore } from '../../../../shared/utils/session';
import Center from '../../../layout/Center';
import AppIcon from '../../../../shared/components/app/AppIcon';
import Form from '../../../components/form/Form';
import OtpField from './OtpField';
import {
  MAX_OTP_LENGTH,
  otpCurrentRefSelector,
  otpHandleKeyPress,
  otpThunkStatusSelector,
  readClipboard,
  getOtpSelector,
  setInitialState as setOtpInitialState,
  setOtpQueryEntry,
} from '../../../store/otp/entities/otp-slices';
import { useQueryParams } from '../../../../shared/hooks/useQueryParams';
import { useLoginTranslation } from '../../../hooks/useLoginTranslation';
import { loginEmailSelector } from '../../../store/login/entities/login-slices';
import LoadingIcon from '../../../../shared/components/icons/LoadingIcon';
import { AxiosClient } from '../../../../shared/utils/axios';
import { loadSettingsData } from '../../../../shared/store/app/settings/thunk';
import toast from '../../../../shared/components/toast/AppToast';
import { resetStore } from '../../../../shared/store/actions';
import {
  userLoaded,
  userSettingsSelector,
} from '../../../../shared/store/app/user/user-slice';
import WarningIcon from '../../../../shared/components/icons/WarningIcon';
import { supportColors } from '../../../../shared/constants/theme';
import config from '../../../../shared/config/config';

const OtpForm = () => {
  // =====================================================================
  // states

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useLoginTranslation();

  const otp = useAppSelector(getOtpSelector);

  const { email } = useAppSelector(loginEmailSelector);
  const currentRefIndex = useAppSelector(otpCurrentRefSelector);
  const otpStatus = useAppSelector(otpThunkStatusSelector);
  const userInfoLoaded = useAppSelector(userLoaded);
  const { verified } = useAppSelector(userSettingsSelector);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const initializationRef = useRef(false);
  const q = useQueryParams();

  // =====================================================================
  // effect

  useEffect(() => {
    if (!initializationRef.current) {
      const qmail = q.get('email');
      const qotp = q.get('otp');

      if (qmail && qotp) {
        dispatch(setOtpQueryEntry(qmail, qotp));
      }

      initializationRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!otpStatus.loading && otpStatus.code === 200 && !otpStatus.msg) {
      const workspace = SessionStore.getActiveWorkspace();
      const userId = SessionStore.getUserID();

      if (!userInfoLoaded && userId) {
        dispatch(loadSettingsData(userId));
      }

      if (userInfoLoaded) {
        // reset the stores
        dispatch(resetStore());

        if (workspace && verified) {
          const nextPath = new URLSearchParams(location.search).get('next');
          navigate(nextPath ?? `/${workspace}`);
        } else {
          navigate(`/login/signup`);
        }
      }
    } else if (otpStatus.msg) {
      if (otpStatus.msg === 'badRequest' || otpStatus.msg === 'unauthorized') {
        toast.error({
          title: t('otpError'),
        });
      } else {
        toast.error({
          title: t(otpStatus.msg),
        });
      }

      dispatch(setOtpInitialState());
    }
  }, [
    otpStatus.code,
    otpStatus.loading,
    otpStatus.msg,
    verified,
    location.search,
    navigate,
    dispatch,
    t,
    userInfoLoaded,
  ]);

  useEffect(() => {
    if (!inputRefs.current) return;

    const ref = inputRefs.current[currentRefIndex];
    if (!ref) return;
    ref.focus();
  }, [inputRefs, currentRefIndex]);

  // =====================================================================
  // handlers
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    dispatch(otpHandleKeyPress(event.key, index));
  };

  const handleReadClipboard = async () => {
    const text = await navigator.clipboard.readText();
    dispatch(readClipboard(text));
  };

  const handleReturnToLogin = () => {
    dispatch(resetStore());
    AxiosClient.clearTokens();
    navigate('/');
  };

  return (
    <Center>
      <div className="flex flex-col items-center justify-center gap-2">
        <AppIcon />
        <Theme.PrimaryText className="text-base">
          {t('Welcome by {{ name }}', { name: config.appName })}
        </Theme.PrimaryText>
      </div>
      <Theme.PrimaryText className="mt-10 text-lg">
        {t('Check your inbox')}
      </Theme.PrimaryText>

      <Theme.PrimaryText className="mt-2 text-center text-base">
        {t('We’ve sent your one-time password to')}
      </Theme.PrimaryText>
      <Theme.PrimaryText className="mb-4 mt-2 text-center text-base">
        {email}
      </Theme.PrimaryText>

      <Theme.PrimaryText className="mt-2 text-center text-sm" disable>
        {t('Enter code here')}
      </Theme.PrimaryText>

      <Form className="m-4 flex-row">
        {otp.slice(0, MAX_OTP_LENGTH).map((val, i) => (
          <React.Fragment key={`otp-${val}-${i.toString()}`}>
            <OtpField
              ref={(e) => {
                inputRefs.current[i] = e;
              }}
              val={val}
              onKeyUp={(e) => handleKeyPress(e, i)}
              data-index={i}
              name={`otp-${i}`}
              err={otpStatus.msg.length > 0}
            />
            {i === 3 && <Theme.PrimaryText>-</Theme.PrimaryText>}
          </React.Fragment>
        ))}
      </Form>

      <Theme.PrimaryButton
        className="h-[3rem] w-[14rem] justify-center"
        onClick={handleReadClipboard}
        dataTestId="clipboard-button"
      >
        {!otpStatus.loading ? t('Paste code') : <LoadingIcon size="20px" />}
      </Theme.PrimaryButton>

      <div className="flex h-[1.2rem] flex-shrink-0 items-center justify-center rounded">
        {otpStatus.msg && (
          <div className="flex flex-row items-center gap-1">
            <WarningIcon fill={supportColors.light.red} />
            <Theme.ErrorText className="text-sm">
              {otpStatus.msg === 'badRequest' ||
              otpStatus.msg === 'unauthorized'
                ? t('otpError')
                : t(otpStatus.msg)}
            </Theme.ErrorText>
          </div>
        )}
      </div>

      <Theme.DefaultButton
        className="mt-1 h-[1.2rem] w-[12rem] justify-center"
        onClick={handleReturnToLogin}
        dataTestId="return-button"
      >
        <Theme.PrimaryText className="text-sm">
          {t('Back to Log in')}
        </Theme.PrimaryText>
      </Theme.DefaultButton>
    </Center>
  );
};

export default OtpForm;
