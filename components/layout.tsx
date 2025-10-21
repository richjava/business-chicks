import Header1 from '@/components/templates/headers/header1';
import Footer1 from '@/components/templates/footers/footer1';

import React, { ReactNode } from 'react';
import { HeaderProps, FooterProps } from '@/lib/types';

interface LayoutProps {
  children: ReactNode;
  headerContent?: HeaderProps['content'];
  footerContent?: FooterProps['content'];
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, headerContent, footerContent } = props;
  return (
    <>
      <Header1 content={headerContent} />
      <main>{children}</main>
      <Footer1 content={footerContent} />
    </>
  );
};

export default Layout;
