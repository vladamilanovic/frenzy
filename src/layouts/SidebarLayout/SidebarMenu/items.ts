import { ReactComponent as MenuIcon } from 'src/assets/icon.svg';

export type MenuItem = {
  link: string;
  icon: any;
  name: string;
};

const menuItems: MenuItem[] = [
  {
    name: 'MY WALLET',
    icon: MenuIcon,
    link: '/wallet'
  },
  {
    name: 'BUY BITCOIN',
    icon: MenuIcon,
    link: '/buy'
  },
  {
    name: 'SELL BITCOIN',
    icon: MenuIcon,
    link: '/sell'
  },
  {
    name: 'BITCOIN PRICE',
    icon: MenuIcon,
    link: '/bitcoin'
  }
];

export default menuItems;
