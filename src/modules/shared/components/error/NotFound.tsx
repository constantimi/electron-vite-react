import React from 'react';
import { useNavigate } from 'react-router';
import Layout from '../../layout/layout/Layout';
import Content from '../../layout/content/Content';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';
import { useSharedTranslation } from '../../hooks/useSharedTranslation';
import NotFoundIcon from '../icons/NotFoundIcon';
import { Theme } from '../../layout/theme';
import { SessionStore } from '../../utils/session';

const NotFound = () => {
  // =====================================================================
  // states
  const navigate = useNavigate();

  const theme = useAppSelector(getTheme);
  const workspace = SessionStore.getActiveWorkspace();

  const { t } = useSharedTranslation();

  // =====================================================================
  // handle
  const handleReturnToDashboard = () => {
    navigate(`/${workspace}`);
  };

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
            className="my-4 flex max-h-full flex-col items-center p-4"
          >
            <NotFoundIcon fill={theme.text.primary} />
            <Theme.PrimaryText className="mt-3 text-lg">
              {t('Page not found')}
            </Theme.PrimaryText>
            <Theme.DefaultButton
              className="mt-6 h-[1rem] w-[16rem] justify-center border-b text-sm"
              onClick={handleReturnToDashboard}
            >
              {t('back to landing')}
            </Theme.DefaultButton>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default NotFound;
