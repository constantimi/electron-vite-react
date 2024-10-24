/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  ToastPosition,
  toast as existingToast,
  ToastOptions,
} from 'react-toastify';
import AppToastContent from './AppToastContent';
import AppToastClose from './AppToastClose';

interface ToastOption extends Omit<ToastProps, 'title' | 'subtitle'> {
  fill?: string;
}
interface ToastProps {
  title: string;
  subtitle?: string;
  autoClose?: number | false | undefined;
  icon?: React.ReactNode | boolean;
  toastId?: string;
  position?: ToastPosition;
}

export class AppToast {
  static getToastOptions = ({
    autoClose,
    icon,
    toastId,
    position,
  }: ToastOption): ToastOptions<unknown> => ({
    style: {
      padding: '0px',
      minHeight: '0px',
      borderRadius: '6px',
      overflow: 'hidden',
      background: 'transparent',
    },
    bodyClassName: 'm-0 p-0',
    autoClose,
    icon: icon as ToastOptions['icon'],
    toastId,
    position: position || 'bottom-right',
    hideProgressBar: true,
    closeButton: <AppToastClose />,
  });

  public static get default() {
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
      ...AppToast.getToastOptions({ autoClose, icon, toastId, position }),
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
        ...AppToast.getToastOptions({
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
      ...AppToast.getToastOptions({ autoClose, icon, toastId, position }),
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
        ...AppToast.getToastOptions({ autoClose, icon, toastId, position }),
      }
    );
}

const toast = new AppToast();

export default toast;
