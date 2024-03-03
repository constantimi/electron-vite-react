import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { useSharedTranslation } from '../useSharedTranslation';

// Mocking react component to use the hook
const Component = () => {
  const { t } = useSharedTranslation();
  return <div>{t('key')}</div>;
};

describe('useSharedTranslation hook', () => {
  beforeEach(() => {
    i18n.init({
      lng: 'en',
      resources: {
        en: {
          shared: {
            key: 'value',
          },
        },
      },
    });
  });

  it('returns translation function that returns correct value for a key', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Component />
      </I18nextProvider>
    );

    expect(screen.getByText('value')).toBeInTheDocument();
  });
});
