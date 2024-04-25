import React from 'react';
import cn from 'classnames';
import { nanoid } from '@reduxjs/toolkit';
import { getTheme } from '../../../shared/store/app/theme';
import { useAppSelector } from '../../../shared/store/hooks';
import { Step, StepList } from '../../types/step';
import { useLoginTranslation } from '../../hooks/useLoginTranslation';

type Props = {
  steps: StepList;
};

const Stepper = ({ steps }: Props) => {
  // =====================================================================
  // states

  const { t } = useLoginTranslation();

  const theme = useAppSelector(getTheme);

  const renderStep = (s: Step) => (
    <div
      key={nanoid()}
      className="flex flex-row items-center justify-center gap-6"
    >
      <div
        className="flex h-5 w-5 items-center justify-center rounded-full border"
        style={{
          color: theme.text.buttonHover,
          borderColor:
            s === steps.currentStep
              ? theme.text.primary
              : s.completed
              ? theme.text.primary
              : theme.text.disabled,
          transform: 'scale(1.3)',
        }}
      >
        <div
          className="flex h-2.5 w-2.5 items-center justify-center rounded-full"
          style={{
            backgroundColor:
              s === steps.currentStep
                ? theme.text.primary
                : s.completed
                ? theme.text.primary
                : theme.text.disabled,
            border: '1px solid',
            borderColor:
              s === steps.currentStep
                ? theme.text.primary
                : s.completed
                ? theme.text.primary
                : theme.text.disabled,
            transform: 'scale(1.3)',
          }}
        />
        <div
          key={nanoid()}
          className="absolute left-1/2 top-8 -translate-x-1/2 transform whitespace-nowrap text-base"
          style={{
            color:
              s === steps.currentStep
                ? theme.text.primary
                : s.completed
                ? theme.text.primary
                : theme.text.disabled,
          }}
        >
          {t(s.title)}
        </div>
      </div>

      {s.next && (
        <div
          className="mb-auto mt-2 h-[1px] w-[90px]"
          style={{
            backgroundColor:
              s === steps.currentStep
                ? theme.text.disabled
                : s.completed
                ? theme.text.primary
                : theme.text.disabled,
          }}
        />
      )}
    </div>
  );

  const chain = [] as React.ReactNode[];
  let current: Step | undefined = steps.chain;

  while (current) {
    const element = renderStep(current);
    chain.push(element);
    current = current.next;
  }

  return (
    <div
      className={cn(
        'flex flex-shrink-0 items-center justify-center gap-6',
        'no-scrollbar h-[100px] w-full overflow-x-auto pb-4'
      )}
    >
      {steps.chain.next && chain}
    </div>
  );
};

export default Stepper;
