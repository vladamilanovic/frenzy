import { Link, useHistory } from 'react-router-dom';
import menuItems, { MenuItem } from './items';
import styles from './index.module.scss';
import cn from 'classnames';

const SidebarMenu = () => {
  const history = useHistory();

  return (
    <aside className={styles.wrapper}>
      {menuItems.map(({ link, name, icon: Icon }: MenuItem) => (
        <Link to={link} key={name} className="text-decoration-none">
          <div
            className={cn(
              'py-2 pl-4 ml-2 d-flex align-items-center',
              styles['menu-item'],
              { [styles.active]: history.location.pathname === link }
            )}
          >
            <Icon className="mr-3" />
            {name}
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default SidebarMenu;
