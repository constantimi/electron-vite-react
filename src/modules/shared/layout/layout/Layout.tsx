/**
 * Layout component that arranges its children into a header, content, and optional sidebar.
 *
 * @component
 * @param {Props} props - The properties object.
 * @param {React.ReactNode | React.ReactNode[]} props.children - The child elements to be rendered within the layout.
 * @param {string} [props.className] - Optional additional class names to apply to the layout container.
 *
 * @returns {JSX.Element} The rendered layout component.
 *
 * @example
 * <Layout>
 *   <HeaderComponent />
 *   <SidebarComponent />
 *   <ContentComponent />
 * </Layout>
 *
 * The above example will render a layout with a header, sidebar, and content area.
 *
 * If only two children are provided, it will render a layout with just a header and content area.
 * If only one child is provided, it will render that single child without any additional layout structure.
 */

import React from 'react';
import cn from 'classnames';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

interface LayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
  sidebar?: React.ReactNode;
}

const Layout = ({ children: possibleChildren, className }: Props) => {
  const childrenArray = React.Children.toArray(possibleChildren);

  const render = ({ header, content, sidebar }: LayoutProps) => (
    <div className="flex flex-row">
      {sidebar && <div className="flex min-w-[200px]">{sidebar}</div>}
      <div className="flex flex-grow flex-col overflow-hidden">
        <div className="flex min-h-[55px]">{header}</div>
        <div className="flex h-[calc(100vh-55px)]">{content}</div>
      </div>
    </div>
  );

  return (
    <div className={cn('h-[100vh]', className)}>
      {childrenArray.length === 3 &&
        render({
          header: childrenArray[0],
          content: childrenArray[2],
          sidebar: childrenArray[1],
        })}

      {childrenArray.length === 2 &&
        render({ header: childrenArray[0], content: childrenArray[1] })}

      {childrenArray.length === 1 && childrenArray[0]}
    </div>
  );
};

export default Layout;
