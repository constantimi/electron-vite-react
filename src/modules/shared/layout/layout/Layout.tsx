import React from 'react';
import cn from 'classnames';
import validateChildren from '../../helpers/validateLayout';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  topbarClassName?: string;
};

/**
 * Layout Component
 *
 * This is a layout component designed to structure the application. It accepts a `className` prop for styling and `children` for content.
 *
 * The `children` prop can be a single ReactNode or an array of ReactNodes, and it expects specific components (Header, Sidebar, Content) in a specific order based on the number of children:
 *
 * - If there are 3 children, they should be of type Header, Sidebar, and Content respectively.
 * - If there are 2 children, they should be of type Sidebar and Content respectively.
 * - If there is 1 child, it should be of type Content.
 *
 * The component validates the structure of the children and will render nothing (and log an error) if the structure is invalid.
 *
 * The component applies a full viewport height styling by default and additional classes can be added via the `className` prop.
 */
const Layout = ({
  children: possibleChildren,
  className,
  topbarClassName,
}: Props) => {
  const children = Array.isArray(possibleChildren)
    ? possibleChildren
    : [possibleChildren];

  const validStructure = validateChildren(children);

  if (!validStructure) {
    // eslint-disable-next-line no-console
    console.error('Invalid structure of children in Layout component');
    return null;
  }

  return (
    <div className={cn('h-[100vh]', className)} data-testid="layout">
      {children.length === 3 && (
        <>
          <div className={cn('h-[55px]', topbarClassName)}>{children[0]}</div>
          <div className="flex h-[calc(100vh-55px)] flex-grow">
            {children[1]}
            {children[2]}
          </div>
        </>
      )}
      {children.length === 2 && <div className="flex flex-row">{children}</div>}
      {children.length === 1 && children[0]}
    </div>
  );
};

export default Layout;
