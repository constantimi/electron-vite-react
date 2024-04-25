import React from 'react';
import { Theme } from '../../../../shared/layout/theme';
import LoginButton from '../../../components/buttons/LoginButton';
import { useLoginTranslation } from '../../../hooks/useLoginTranslation';
import { useAppSelector } from '../../../../shared/store/hooks';
import { getRegisterFormState } from '../../../store/register/entities/register-slices';
import { Step, StepNames } from '../../../types/step';
import { userSettingsSelector } from '../../../../shared/store/app/user/user-slice';

export const welcomeStep: () => Step = () => ({
  title: StepNames.Welcome,
});

type Props = {
  onConfirm: () => void;
};

const Welcome = ({ onConfirm }: Props) => {
  // =====================================================================
  // states

  const { firstName, lastName } = useAppSelector(userSettingsSelector);
  const account = useAppSelector(getRegisterFormState);

  const { t } = useLoginTranslation();

  return (
    <>
      <div className="mb-6 flex w-[28rem] flex-row items-center justify-center gap-2">
        <Theme.PrimaryText className="mb-1 text-center text-[36px]">
          {t('Welcome {{firstName}} {{lastName}}', {
            firstName: account.firstName || firstName.value,
            lastName: account.lastName || lastName.value,
          })}
        </Theme.PrimaryText>
      </div>
      <LoginButton
        dataTestId="registerButton"
        onClick={onConfirm}
        placeholder={t('Start')}
        className="!w-[18rem]"
      />
    </>
  );
};

export default Welcome;
