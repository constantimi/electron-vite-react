import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import useOutsideTooltipClick from '../useOutsideTooltipClick';

describe('useOutsideTooltipClick hook', () => {
  it('does not call handler when click is in element', async () => {
    const handler = jest.fn();

    const Wrapper = () => {
      const ref = useOutsideTooltipClick(handler);
      return (
        <div ref={ref} data-testid="test-elementId">
          Test element
        </div>
      );
    };

    render(<Wrapper />);

    expect(screen.getByText('Test element')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Test element'));

    expect(handler).toBeCalledTimes(0);
  });

  it('does call handler when click is in element', async () => {
    const handler = jest.fn();

    const Wrapper = () => {
      const ref = useOutsideTooltipClick(handler);
      return (
        <div ref={ref} data-testid="test-elementId">
          Test element
        </div>
      );
    };

    render(<Wrapper />);

    expect(screen.getByText('Test element')).toBeInTheDocument();

    await userEvent.click(document.body);

    expect(handler).toBeCalledTimes(1);
  });

  it('should call the scroll handler when user scroll elements', async () => {
    const handler = jest.fn();

    const Wrapper = () => {
      const ref = useOutsideTooltipClick(handler);
      return (
        <div ref={ref} data-testid="test-elementId">
          Test element
        </div>
      );
    };

    render(<Wrapper />);

    fireEvent.wheel(document.body);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should close if button is not present', async () => {
    const handler = jest.fn();
    const Wrapper = () => {
      const ref = useOutsideTooltipClick(handler);
      return (
        <>
          <div ref={ref} id="react-portal-modal-container">
            Test element
          </div>
          <div>Outside thing</div>
        </>
      );
    };

    render(<Wrapper />);

    await userEvent.click(screen.getByText('Outside thing'));

    expect(handler).toHaveBeenCalled();
  });
});
