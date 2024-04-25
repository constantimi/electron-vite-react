import React from 'react';
import {
  IconProps,
  ToastPosition,
  toast as existingToast,
} from 'react-toastify';
import AppToastContent from './AppToastContent';
import AppToastClose from './AppToastClose';

interface ToastProps {
  title: string;
  subtitle?: string;
  autoClose?: number | false | undefined;
  icon?:
    | false
    | ((props: IconProps) => React.ReactNode)
    | React.ReactElement<IconProps>;
  toastId?: string;
  position?: ToastPosition;
}

interface ToastOption extends Omit<ToastProps, 'title' | 'subtitle'> {
  fill?: string;
}
export class AppToast {
  // eslint-disable-next-line class-methods-use-this
  private getToastOptions = ({
    autoClose,
    icon,
    toastId,
    position,
  }: ToastOption) => ({
    style: {
      padding: '0px',
      minHeight: '0px',
      borderRadius: '6px',
      overflow: 'hidden',
      background: 'transparent',
    },
    bodyClassName: 'm-0 p-0',
    autoClose,
    icon,
    toastId,
    position: position || 'bottom-right',
    hideProgressBar: true,
    closeButton: <AppToastClose />,
  });

  // eslint-disable-next-line class-methods-use-this
  public get default() {
    return existingToast;
  }

  info = ({
    title,
    subtitle,
    autoClose,
    icon = false,
    toastId,
    position,
  }: ToastProps) =>
    existingToast.info(<AppToastContent title={title} subtitle={subtitle} />, {
      ...this.getToastOptions({ autoClose, icon, toastId, position }),
    });

  success = ({
    title,
    subtitle,
    autoClose = 3000,
    icon = false,
    toastId,
    position,
  }: ToastProps) =>
    existingToast.success(
      <AppToastContent title={title} subtitle={subtitle} />,
      {
        ...this.getToastOptions({
          autoClose,
          icon,
          toastId,
          position,
        }),
      }
    );

  error = ({
    title,
    subtitle,
    autoClose,
    icon = false,
    toastId,
    position,
  }: ToastProps) =>
    existingToast.error(<AppToastContent title={title} subtitle={subtitle} />, {
      ...this.getToastOptions({ autoClose, icon, toastId, position }),
    });

  warning = ({
    title,
    subtitle,
    autoClose,
    icon = false,
    toastId,
    position,
  }: ToastProps) =>
    existingToast.warning(
      <AppToastContent title={title} subtitle={subtitle} />,
      {
        ...this.getToastOptions({ autoClose, icon, toastId, position }),
      }
    );
}

const toast = new AppToast();

export default toast;
