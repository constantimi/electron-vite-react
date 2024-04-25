import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { getTheme } from '../../../shared/store/app/theme';
import AccountSetUp, { accountSetupStep } from './account/AccountSetUp';
import LoginLayout from '../../layout/LoginLayout';
import Stepper from '../../components/stepper/Stepper';
import Welcome, { welcomeStep } from './welcome/Welcome';
import {
  userLoaded,
  userSettingsSelector,
} from '../../../shared/store/app/user/user-slice';
import { SessionStore } from '../../../shared/utils/session';
import { AxiosClient } from '../../../shared/utils/axios';
import { resetAuthResponse } from '../../../shared/store/app/auth/auth-slice';
import { loadUserInfo } from '../../../shared/store/app/user/user-thunk';
import { Step, StepList, StepNames } from '../../types/step';
import AppIcon from '../../../shared/components/app/AppIcon';
import { useLoginTranslation } from '../../hooks/useLoginTranslation';

const Register = () => {
  // =====================================================================
  // states

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useLoginTranslation();

  const theme = useAppSelector(getTheme);

  const { verified } = useAppSelector(userSettingsSelector);
  const userInfoLoaded = useAppSelector(userLoaded);

  const [stepper, setStepper] = useState<null | StepList>();

  // =====================================================================
  // effect

  useEffect(() => {
    const userId = SessionStore.getUserID();

    // =====================================================================
    // handle reload

    const accessToken = SessionStore.getAccessToken();
    const accessTokenValid = AxiosClient.validToken(accessToken);

    // If access token is not valid or not present,
    // clear tokens and navigate to login
    if (!accessToken || !accessTokenValid) {
      AxiosClient.clearTokens();
      dispatch(resetAuthResponse());
      navigate('/');
      return;
    }

    if (!userInfoLoaded && userId) {
      dispatch(loadUserInfo({ urlArgs: userId }));
      return;
    }

    // =====================================================================
    // create steps based on the conditions

    let newStepper: Step | null = null;

    if (!verified) {
      const s = accountSetupStep();
      newStepper = s;
    }

    if (newStepper) {
      const s = welcomeStep();
      if (newStepper.next) {
        s.prev = newStepper.next;
        newStepper.next.next = s;
      } else {
        s.prev = newStepper;
        newStepper.next = s;
      }
    }

    // Entering this flow through the create workspace button
    if (!newStepper && verified) {
      navigate(`/`);
      return;
    }

    if (newStepper) {
      setStepper({ currentStep: newStepper, chain: newStepper });
    }
  }, [dispatch, navigate, t, userInfoLoaded, verified]);

  if (!stepper) {
    const nextPath = new URLSearchParams(location.search).get('next');

    if (verified && nextPath) {
      navigate(`/${nextPath}`);
    }

    return null;
  }

  const handleNextStep = () => {
    stepper.currentStep.completed = true;
    if (stepper.currentStep.next) {
      setStepper({ ...stepper, currentStep: stepper.currentStep.next });
    } else {
      navigate('/');
    }
  };

  return (
    <LoginLayout>
      <div className="flex h-full w-full items-center justify-center overflow-auto">
        <div className="flex flex-col items-center justify-center p-4">
          <div className="flex flex-row justify-center gap-2">
            <AppIcon />
          </div>

          <Stepper steps={stepper} />

          <div
            className="flex min-h-full flex-col gap-4 p-4 md:px-8"
            style={{
              backgroundColor: theme.background.main,
            }}
          >
            {stepper.currentStep.title === StepNames.AccountSetUp && (
              <AccountSetUp onConfirm={handleNextStep} />
            )}
            {stepper.currentStep.title === StepNames.Welcome && (
              <Welcome onConfirm={handleNextStep} />
            )}
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Register;
