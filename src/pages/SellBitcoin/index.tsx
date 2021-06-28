import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CircularLoading from 'src/components/CircularLoading';
import { sellBitcoin } from 'src/slices/balance';
import { useDispatch, useSelector } from 'src/store';
import iziToast from 'izitoast';
import { SELL_BITCOIN_REQUEST, BUY_SELL_BITCOIN_AMOUNT } from 'src/constants';
import { numberToCurrencyLocaleString } from 'src/utils';

iziToast.settings({
  position: 'bottomRight',
  maxWidth: 400
});

const SellBitcoin = () => {
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  const handleSell = (e) => {
    if (balance.bitcoin < BUY_SELL_BITCOIN_AMOUNT) {
      iziToast.info({
        title: 'Info',
        message: 'There is no enough bitcoin to sell'
      });
      return;
    }

    dispatch(sellBitcoin());
  };

  useEffect(() => {
    if (!balance.requestType && balance.requestResult) {
      iziToast.success({
        title: 'Success',
        message: balance.requestResult
      });
    } else if (!balance.requestType && balance.errMsg) {
      iziToast.error({
        title: 'Error',
        message: balance.errMsg
      });
    }
  }, [balance.requestType, balance.requestResult, balance.errMsg, dispatch]);

  const isLoadingSell = balance.requestType === SELL_BITCOIN_REQUEST;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center align-items-center h-100">
      <div className="content-substring">{`Bitcoin price is ${numberToCurrencyLocaleString(
        balance.bitToUsdRate
      )}`}</div>

      <div className="content-substring">
        {balance.bitToUsdRate >= 10000
          ? 'Prices are high, sell now!'
          : 'Prices are low, are you sure you want to sell?'}
      </div>

      <Button
        onClick={handleSell}
        disabled={isLoadingSell}
        variant="vm"
        className="mt-4"
      >
        Sell 1 Bitcoin
        {isLoadingSell && <CircularLoading color="#ffffff" />}
      </Button>
    </div>
  );
};

export default SellBitcoin;
