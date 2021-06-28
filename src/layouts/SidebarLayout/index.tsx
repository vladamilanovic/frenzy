import { ReactNode } from 'react';
import Header from './Header';
import SidebarHistory from './SidebarHistory';
import SidebarMenu from './SidebarMenu';
import styles from './index.module.scss';

type SidebarLayoutProps = {
  children?: ReactNode;
};

const SidebarLayout = (props: SidebarLayoutProps) => {
  return (
    <div className={styles['sidebar-layout-wrapper']}>
      <Header />
      <div className={styles['main-wrapper']}>
        <SidebarMenu />
        <main className="flex-grow-1">{props.children}</main>
        <SidebarHistory />
      </div>
    </div>
  );
};

export default SidebarLayout;
