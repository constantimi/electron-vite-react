import React from 'react';
import cn from 'classnames';
import { ToastContentProps, TypeOptions } from 'react-toastify';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';
import ErrorIcon from '../icons/ErrorIcon';
import SuccessIcon from '../icons/SuccessIcon';
import InfoIcon from '../icons/InfoIcon';
import WarningIcon from '../icons/WarningIcon';
import { supportColors } from '../../constants/theme';
import { Theme } from '../../layout/theme';

type ToastProps = {
  title: string;
  subtitle?: string;
  toast?: ToastContentProps;
};

export const handleToastIcon = (type: TypeOptions) => {
  switch (type) {
    case 'success':
      return <SuccessIcon fill={supportColors.regular.green} />;
    case 'error':
      return <ErrorIcon fill={supportColors.regular.red} />;
    case 'info':
      return <InfoIcon fill={supportColors.regular.blue} />;
    case 'warning':
      return <WarningIcon fill={supportColors.regular.orange} />;
    default:
      return <SuccessIcon fill={supportColors.regular.green} />;
  }
};

const AppToastContent = ({ title, subtitle, ...toast }: ToastProps) => {
  const theme = useAppSelector(getTheme);
  const isItemCentered = !subtitle ? 'items-center' : '';
  const toastType = (toast as ToastContentProps).toastProps?.type;

  let toastStyle = {
    borderColor: supportColors.regular.green,
    backgroundColor: theme.text.primary,
  };

  switch (toastType) {
    case 'success':
      toastStyle = {
        borderColor: supportColors.regular.green,
        backgroundColor: theme.text.primary,
      };
      break;
    case 'error':
      toastStyle = {
        borderColor: supportColors.regular.red,
        backgroundColor: theme.text.primary,
      };
      break;
    case 'info':
      toastStyle = {
        borderColor: supportColors.regular.blue,
        backgroundColor: theme.text.primary,
      };
      break;
    case 'warning':
      toastStyle = {
        borderColor: supportColors.regular.orange,
        backgroundColor: theme.text.primary,
      };
      break;
    default:
      toastStyle = {
        borderColor: supportColors.regular.green,
        backgroundColor: theme.text.primary,
      };
  }

  return (
    <div
      className="flex h-full min-h-[63px] items-center rounded-md border-l-[9px] p-2"
      style={{
        ...toastStyle,
        backgroundColor: theme.background.topbar,
      }}
    >
      <div className={cn('flex gap-3', isItemCentered)}>
        <div className="w-4">{handleToastIcon(toastType as TypeOptions)}</div>
        <div>
          <Theme.PrimaryText className="text-base font-medium">
            {title}
          </Theme.PrimaryText>
          {subtitle && (
            <Theme.PrimaryText className="pt-1 text-xs font-normal">
              {subtitle}
            </Theme.PrimaryText>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppToastContent;
