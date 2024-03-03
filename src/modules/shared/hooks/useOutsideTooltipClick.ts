import React, { useEffect, useRef } from 'react';

/**
 * Hook to detect an outsie click of the modals that are open, if detected will set the callback to
 * close the Modal and the submenu component. Also implemented the scroll "wheel" detection to close the submenu
 * @param callback function to handle the close modal when clicked outside
 */
export const useOutsideTooltipClick = (callback: () => unknown) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      // const modalButton = document.getElementById('cancel-generic-popup');
      const modaOpen = document.getElementById('react-portal-modal-container');
      const button = event.target as HTMLInputElement;
      if (
        ref.current &&
        !ref.current.contains(button) &&
        // maybe change this in the future
        !modaOpen?.contains(button)
      ) {
        callback();
      }
    };

    const handleScroll = () => {
      if (ref.current) {
        callback();
      }
    };

    document.addEventListener('wheel', handleScroll);

    document.addEventListener(
      'click',
      handleClick as unknown as EventListenerOrEventListenerObject,
      true
    );

    return () => {
      document.addEventListener(
        'scroll',
        handleScroll as unknown as EventListenerOrEventListenerObject,
        true
      );
      document.removeEventListener(
        'click',
        handleClick as unknown as EventListenerOrEventListenerObject,
        true
      );
    };
  }, [ref, callback]);

  return ref;
};

export default useOutsideTooltipClick;
