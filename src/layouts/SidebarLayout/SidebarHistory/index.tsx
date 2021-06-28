import { useSelector } from 'src/store';
import cn from 'classnames';
import styles from './index.module.scss';

const SidebarHistory = () => {
  const history = useSelector((state) => state.history);

  if (history.length === 0) {
    return (
      <aside className={styles.wrapper}>
        <div className="text-center pt-5">No history</div>
      </aside>
    );
  }

  return (
    <aside className={styles.wrapper}>
      {history.map(({ date, content }, index) => (
        <div
          key={`history-${index}`}
          className={cn('pt-2', styles['history-item'])}
        >
          <div className={cn('pl-3 pb-3', styles['history-item-date'])}>
            {date}
          </div>
          <div className={cn('pl-5', styles['history-item-content'])}>
            {content}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default SidebarHistory;
