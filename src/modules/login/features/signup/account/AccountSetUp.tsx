import React, { ChangeEvent, useEffect } from 'react';
import LoginButton from '../../../components/buttons/LoginButton';
import Form from '../../../components/form/Form';
import Field from '../../../components/form/Field';
import { Theme } from '../../../../shared/layout/theme';
import { useAppDispatch, useAppSelector } from '../../../../shared/store/hooks';
import { useLoginTranslation } from '../../../hooks/useLoginTranslation';
import {
  handleRegisterState,
  registerHandleOnChange,
  registerThunkStatusSelector,
  resetStatus,
} from '../../../store/register/entities/register-slices';
import { RegisterScheme } from '../../../types/register';
import toast from '../../../../shared/components/toast/AppToast';
import WarningIcon from '../../../../shared/components/icons/WarningIcon';
import { supportColors } from '../../../../shared/constants/theme';
import { Step, StepNames } from '../../../types/step';

export const accountSetupStep: () => Step = () => ({
  title: StepNames.AccountSetUp,
});

type Props = {
  onConfirm: () => void;
};

const AccountSetUp = ({ onConfirm }: Props) => {
  // =====================================================================
  // states

  const dispatch = useAppDispatch();

  const { t } = useLoginTranslation();

  const { status, errFirstName, errLastName, errUsername } = useAppSelector(
    registerThunkStatusSelector
  );

  // =====================================================================
  // effect

  useEffect(() => {
    if (status.code === 200 && !status.msg && !status.loading) {
      dispatch(resetStatus());
      onConfirm();
    } else if (status.code !== 200 && status.msg && !status.loading) {
      if (status.msg === 'badRequest' || status.msg === 'unauthorized') {
        toast.error({
          title: t('registerError'),
        });
      } else {
        toast.error({
          title: t(status.msg),
        });
      }

      dispatch(resetStatus());
    }
  }, [status.code, status.msg, status.loading, dispatch, t, onConfirm]);

  // =====================================================================
  // handle

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    dispatch(registerHandleOnChange(field, event.target.value));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(handleRegisterState);
    }
  };

  const handleSubmit = () => {
    dispatch(handleRegisterState);
  };

  return (
    <div className="w-[28rem]">
      <Form className="mt-6 flex-col">
        <Field
          dataTestId="firstName"
          label={t('First name')}
          placeholder={t('First name')}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleOnChange(e, RegisterScheme.firstName)}
          errorMessage={t(errFirstName)}
        />
        <Field
          dataTestId="lastName"
          label={t('Last name')}
          placeholder={t('Last name')}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleOnChange(e, RegisterScheme.lastName)}
          errorMessage={t(errLastName)}
        />
        <Field
          dataTestId="username"
          label={t('Username')}
          placeholder={t('Username')}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleOnChange(e, RegisterScheme.username)}
          errorMessage={t(errUsername)}
        />
      </Form>

      <div className="mt-4 flex w-full flex-col">
        <LoginButton
          dataTestId="registerButton"
          onClick={handleSubmit}
          placeholder={t('Continue')}
          isLoading={status.loading}
        />
        <div className="flex h-[1rem] w-full flex-shrink-0 flex-row items-center gap-1">
          {status.msg && (
            <>
              <WarningIcon fill={supportColors.light.red} />
              <Theme.ErrorText className="text-left text-[10px]">
                {status.msg === 'badRequest' || status.msg === 'unauthorized'
                  ? t('registerError')
                  : t(status.msg)}
              </Theme.ErrorText>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSetUp;
