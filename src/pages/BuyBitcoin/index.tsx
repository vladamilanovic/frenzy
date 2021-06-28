import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CircularLoading from 'src/components/CircularLoading';
import { buyBitcoin } from 'src/slices/balance';
import { useDispatch, useSelector } from 'src/store';
import iziToast from 'izitoast';
import { BUY_BITCOIN_REQUEST } from 'src/constants';
import { numberToCurrencyLocaleString } from 'src/utils';

iziToast.settings({
  position: 'bottomRight',
  maxWidth: 400
});

const Buybitcoin = () => {
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  const handleBuy = (e) => {
    if (balance.cash < balance.bitToUsdRate) {
      iziToast.info({
        title: 'Info',
        message: 'There is no enough cash to buy 1 bitcoin'
      });
      return;
    }

    dispatch(buyBitcoin());
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

  const isLoadingBuy = balance.requestType === BUY_BITCOIN_REQUEST;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center align-items-center h-100">
      <div className="content-substring">{`Bitcoin price is ${numberToCurrencyLocaleString(
        balance.bitToUsdRate
      )}`}</div>

      <div className="content-substring">
        {balance.bitToUsdRate >= 10000
          ? 'Prices are high, are you sure that you want to buy?'
          : 'Prices are low, buy more!'}
      </div>

      <Button
        onClick={handleBuy}
        disabled={isLoadingBuy}
        variant="vm"
        className="mt-4"
      >
        Buy 1 Bitcoin
        {isLoadingBuy && <CircularLoading color="#ffffff" />}
      </Button>
    </div>
  );
};

export default Buybitcoin;
