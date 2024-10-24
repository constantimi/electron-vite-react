import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';
import { useSharedTranslation } from '../../hooks/useSharedTranslation';
import { Theme } from '../../layout/theme';
import Layout from '../../layout/layout/Layout';
import Content from '../../layout/content/Content';
import PhoneLinkErase from '../icons/PhonelinkErase';

const NotSupported = () => {
  const theme = useAppSelector(getTheme);

  const { t } = useSharedTranslation();

  return (
    <Layout>
      <Content className="h-full">
        {/* Outer container for overflowing vertically when collapsing the content */}
        <div
          data-testid="center-outer-container"
          className="flex h-full w-full items-center justify-center overflow-auto"
        >
          {/* Inner container for vertical and horizontal centering */}
          <div
            data-testid="center-inner-container"
            className="my-4 flex max-h-full w-full max-w-[238px] flex-col items-center p-4 text-center"
          >
            <PhoneLinkErase fill={theme.text.primary} />
            <Theme.PrimaryText className="mt-6 text-lg">
              {t('We are sorry')}
            </Theme.PrimaryText>
            <Theme.PrimaryText className="mt-6 text-lg">
              {t(
                'Mobile portrait mode is not supported yet. Please rotate your screen to landscape mode.'
              )}
            </Theme.PrimaryText>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default NotSupported;
