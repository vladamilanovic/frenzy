import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CircularLoading from 'src/components/CircularLoading';
import { deposit, withdraw } from 'src/slices/balance';
import { useDispatch, useSelector } from 'src/store';
import iziToast from 'izitoast';
import {
  DEPOSIT_REQUEST,
  DEPOSIT_WITHDRAW_AMOUNT,
  WITHDRAW_REQUEST
} from 'src/constants';

iziToast.settings({
  position: 'bottomRight',
  maxWidth: 400
});

const MyWallet = () => {
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  const handleDeposit = (e) => {
    dispatch(deposit());
  };

  const handleWithdraw = (e) => {
    if (balance.cash < DEPOSIT_WITHDRAW_AMOUNT) {
      iziToast.info({
        title: 'Info',
        message: 'There is no cash to withdraw'
      });
      return;
    }

    dispatch(withdraw());
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
    balance.requestType === DEPOSIT_REQUEST ||
    balance.requestType === WITHDRAW_REQUEST;
  const isLoadingDeposit = balance.requestType === DEPOSIT_REQUEST;
  const isLoadingWithdraw = balance.requestType === WITHDRAW_REQUEST;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center align-items-center h-100">
      <div className="content-substring">Your Bitcoin wallet</div>
      <div className="content-substring">{`You now own ${balance.bitcoin} Bitcoins`}</div>

      <Button
        onClick={handleDeposit}
        disabled={isDisabled}
        variant="vm"
        className="mt-4"
      >
        Deposit $100
        {isLoadingDeposit && <CircularLoading color="#ffffff" />}
      </Button>
      <Button onClick={handleWithdraw} disabled={isDisabled} variant="vm">
        Withdraw $100
        {isLoadingWithdraw && <CircularLoading color="#ffffff" />}
      </Button>
    </div>
  );
};

export default MyWallet;
