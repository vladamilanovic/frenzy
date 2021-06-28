import { ReactNode } from 'react';

type BaseLayoutProps = {
  children?: ReactNode;
};

const BaseLayout = (props: BaseLayoutProps) => {
  return <>{props.children}</>;
};

export default BaseLayout;
