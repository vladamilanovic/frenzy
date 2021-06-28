import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CircularLoading from 'src/components/CircularLoading';
import { decreaseBitcoinPrice, increaseBitcoinPrice } from 'src/slices/balance';
import { useDispatch, useSelector } from 'src/store';
import iziToast from 'izitoast';
import {
  INC_BITCOIN_REQUEST,
  DEC_BITCOIN_REQUEST,
  INC_DEC_BITCOIN_PRICE
} from 'src/constants';
import { numberToCurrencyLocaleString } from 'src/utils';

iziToast.settings({
  position: 'bottomRight',
  maxWidth: 400
});

const BitcoinPrice = () => {
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  const handleIncreaseBitcoinPrice = (e) => {
    dispatch(increaseBitcoinPrice());
  };

  const handleDecreaseBitcoinPrice = (e) => {
    if (balance.bitToUsdRate <= 1000) {
      iziToast.info({
        title: 'Info',
        message: `Bitcoin price cannot be below ${numberToCurrencyLocaleString(
          1000
        )}`
      });
      return;
    }

    dispatch(decreaseBitcoinPrice());
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

  const isDisabled =
    balance.requestType === INC_BITCOIN_REQUEST ||
    balance.requestType === DEC_BITCOIN_REQUEST;
  const isLoadingIncrease = balance.requestType === INC_BITCOIN_REQUEST;
  const isLoadingDecrease = balance.requestType === DEC_BITCOIN_REQUEST;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center align-items-center h-100">
      <div className="content-substring">{`Bitcoin price is ${numberToCurrencyLocaleString(
        balance.bitToUsdRate
      )}`}</div>

      <div className="d-flex">
        <Button
          onClick={handleIncreaseBitcoinPrice}
          disabled={isDisabled}
          variant="vm"
          className="mt-4 mr-3"
        >
          {`Increase Bitcoin\nPrice(+${numberToCurrencyLocaleString(
            INC_DEC_BITCOIN_PRICE
          )})`}
          {isLoadingIncrease && <CircularLoading color="#ffffff" />}
        </Button>
        <Button
          onClick={handleDecreaseBitcoinPrice}
          disabled={isDisabled}
          variant="vm"
          className="mt-4"
        >
          {`Decrease Bitcoin\nPrice(-${numberToCurrencyLocaleString(
            INC_DEC_BITCOIN_PRICE
          )})`}
          {isLoadingDecrease && <CircularLoading color="#ffffff" />}
        </Button>
      </div>
    </div>
  );
};

export default BitcoinPrice;
