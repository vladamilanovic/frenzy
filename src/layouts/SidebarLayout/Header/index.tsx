import { ReactComponent as LogoSVG } from 'src/assets/bitcoin.svg';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './index.module.scss';
import { numberToCurrencyLocaleString } from 'src/utils';
import { useSelector } from 'src/store';

const Header = () => {
  const { bitToUsdRate, cash, bitcoin } = useSelector((state) => state.balance);

  return (
    <header className={styles.wrapper}>
      <Link className={cn('text-decoration-none', styles.logo_div)} to="/">
        <LogoSVG className="mr-3" />
        BITCOIN FRENZY
      </Link>

      <div>{`1 BITCOIN = ${numberToCurrencyLocaleString(bitToUsdRate)}`}</div>

      <div>
        <div className="small">{numberToCurrencyLocaleString(cash)}</div>
        <div>{`${bitcoin} BITCOINS`}</div>
      </div>
    </header>
  );
};

export default Header;
