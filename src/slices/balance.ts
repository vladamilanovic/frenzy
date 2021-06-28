import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  getLocalStorage,
  numberToCurrencyLocaleString,
  setLocalStorage,
  sleep
} from 'src/utils';
import {
  BUY_BITCOIN_REQUEST,
  BUY_SELL_BITCOIN_AMOUNT,
  DEC_BITCOIN_REQUEST,
  DEPOSIT_REQUEST,
  DEPOSIT_WITHDRAW_AMOUNT,
  INC_BITCOIN_REQUEST,
  INC_DEC_BITCOIN_PRICE,
  LOCALSTORAGE_BALANCE_KEY,
  SELL_BITCOIN_REQUEST,
  WITHDRAW_REQUEST
} from 'src/constants';
import { AppThunk } from 'src/store';
import { addHistory } from './history';

interface BalanceState {
  bitcoin: number;
  currency: string;
  cash: number;
  bitToUsdRate: number;

  requestType: string;
  errMsg: string;
  requestResult: string;
}

const initialState: BalanceState = {
  bitcoin: 0,
  currency: 'USD',
  cash: 200,
  bitToUsdRate: 1000,

  requestType: '',
  errMsg: '',
  requestResult: ''
};

const UINotificationInfoRemovedBalanceState = (
  state: BalanceState
): BalanceState => {
  return { ...state, requestType: '', errMsg: '', requestResult: '' };
};

const localStorageInitialState = getLocalStorage(
  LOCALSTORAGE_BALANCE_KEY
) as BalanceState;

const slice = createSlice({
  name: 'balance',
  initialState: localStorageInitialState || initialState,
  reducers: {
    removeUINotificationInfo(state: BalanceState) {
      state.requestType = '';
      state.errMsg = '';
      state.requestResult = '';
    },
    actionRequest(
      state: BalanceState,
      action: PayloadAction<{ type: string }>
    ) {
      const { type } = action.payload;
      state.requestType = type;
      state.errMsg = '';
      state.requestResult = '';
    },
    requestSuccessOrFail(
      state: BalanceState,
      action: PayloadAction<{ message: string; success?: boolean }>
    ) {
      const { message, success = true } = action.payload;
      state.requestType = '';
      if (success) state.requestResult = message;
      else state.errMsg = message;
    },

    deposit(state: BalanceState, action: PayloadAction<{ amount: number }>) {
      const { amount } = action.payload;
      state.cash = state.cash + amount;
      setLocalStorage(
        LOCALSTORAGE_BALANCE_KEY,
        UINotificationInfoRemovedBalanceState(state)
      );
    },
    withdraw(state: BalanceState, action: PayloadAction<{ amount: number }>) {
      const { amount } = action.payload;
      state.cash = state.cash - amount;
      setLocalStorage(
        LOCALSTORAGE_BALANCE_KEY,
        UINotificationInfoRemovedBalanceState(state)
      );
    },

    buyBitcoin(state: BalanceState, action: PayloadAction<{ amount: number }>) {
      const { amount } = action.payload;
      state.bitcoin += amount;
      state.cash = state.cash - state.bitToUsdRate;
      setLocalStorage(
        LOCALSTORAGE_BALANCE_KEY,
        UINotificationInfoRemovedBalanceState(state)
      );
    },
    sellBitcoin(
      state: BalanceState,
      action: PayloadAction<{ amount: number }>
    ) {
      const { amount } = action.payload;
      state.bitcoin -= amount;
      state.cash = state.cash + state.bitToUsdRate;
      setLocalStorage(
        LOCALSTORAGE_BALANCE_KEY,
        UINotificationInfoRemovedBalanceState(state)
      );
    },

    increaseBitcoinPrice(
      state: BalanceState,
      action: PayloadAction<{ amount: number }>
    ) {
      const { amount } = action.payload;
      state.bitToUsdRate += amount;
      setLocalStorage(
        LOCALSTORAGE_BALANCE_KEY,
        UINotificationInfoRemovedBalanceState(state)
      );
    },
    decreaseBitcoinPrice(
      state: BalanceState,
      action: PayloadAction<{ amount: number }>
    ) {
      const { amount } = action.payload;
      state.bitToUsdRate -= amount;
      setLocalStorage(
        LOCALSTORAGE_BALANCE_KEY,
        UINotificationInfoRemovedBalanceState(state)
      );
    }
  }
});

export const deposit = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.actionRequest({ type: DEPOSIT_REQUEST }));
  try {
    await sleep();

    dispatch(slice.actions.deposit({ amount: DEPOSIT_WITHDRAW_AMOUNT }));

    dispatch(
      slice.actions.requestSuccessOrFail({
        message: `Deposited ${numberToCurrencyLocaleString(
          DEPOSIT_WITHDRAW_AMOUNT
        )}`
      })
    );

    dispatch(
      addHistory({
        value: {
          date: new Date().toLocaleString(),
          content: `Deposited ${numberToCurrencyLocaleString(
            DEPOSIT_WITHDRAW_AMOUNT
          )}`
        }
      })
    );
    dispatch(slice.actions.removeUINotificationInfo());
  } catch (e) {
    console.log('deposit catch:', e);
    dispatch(
      slice.actions.requestSuccessOrFail({
        message: e.message || 'Something went wrong!',
        success: false
      })
    );
  }
};

export const withdraw = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.actionRequest({ type: WITHDRAW_REQUEST }));
  await sleep();

  dispatch(slice.actions.withdraw({ amount: DEPOSIT_WITHDRAW_AMOUNT }));

  dispatch(
    slice.actions.requestSuccessOrFail({
      message: `Withdrawed ${numberToCurrencyLocaleString(
        DEPOSIT_WITHDRAW_AMOUNT
      )}`
    })
  );
  dispatch(
    addHistory({
      value: {
        date: new Date().toLocaleString(),
        content: `Withdrawed ${numberToCurrencyLocaleString(
          DEPOSIT_WITHDRAW_AMOUNT
        )}`
      }
    })
  );
  dispatch(slice.actions.removeUINotificationInfo());
};

export const buyBitcoin = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.actionRequest({ type: BUY_BITCOIN_REQUEST }));
  await sleep();

  dispatch(slice.actions.buyBitcoin({ amount: BUY_SELL_BITCOIN_AMOUNT }));

  dispatch(
    slice.actions.requestSuccessOrFail({
      message: `Purchased ${BUY_SELL_BITCOIN_AMOUNT} Bitcoin`
    })
  );
  dispatch(
    addHistory({
      value: {
        date: new Date().toLocaleString(),
        content: `Purchased ${BUY_SELL_BITCOIN_AMOUNT} Bitcoin`
      }
    })
  );
  dispatch(slice.actions.removeUINotificationInfo());
};

export const sellBitcoin = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.actionRequest({ type: SELL_BITCOIN_REQUEST }));
  await sleep();

  dispatch(slice.actions.sellBitcoin({ amount: BUY_SELL_BITCOIN_AMOUNT }));

  dispatch(
    slice.actions.requestSuccessOrFail({
      message: `Sold ${BUY_SELL_BITCOIN_AMOUNT} Bitcoin`
    })
  );
  dispatch(
    addHistory({
      value: {
        date: new Date().toLocaleString(),
        content: `Sold ${BUY_SELL_BITCOIN_AMOUNT} Bitcoin`
      }
    })
  );
  dispatch(slice.actions.removeUINotificationInfo());
};

export const increaseBitcoinPrice = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.actionRequest({ type: INC_BITCOIN_REQUEST }));
  await sleep();

  dispatch(
    slice.actions.increaseBitcoinPrice({ amount: INC_DEC_BITCOIN_PRICE })
  );

  dispatch(
    slice.actions.requestSuccessOrFail({
      message: `Increased Bitcoin price by ${numberToCurrencyLocaleString(
        INC_DEC_BITCOIN_PRICE
      )}`
    })
  );
  dispatch(
    addHistory({
      value: {
        date: new Date().toLocaleString(),
        content: `Increased Bitcoin price by ${numberToCurrencyLocaleString(
          INC_DEC_BITCOIN_PRICE
        )}`
      }
    })
  );
  dispatch(slice.actions.removeUINotificationInfo());
};

export const decreaseBitcoinPrice = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.actionRequest({ type: DEC_BITCOIN_REQUEST }));
  await sleep();

  dispatch(
    slice.actions.decreaseBitcoinPrice({ amount: INC_DEC_BITCOIN_PRICE })
  );

  dispatch(
    slice.actions.requestSuccessOrFail({
      message: `Decreased Bitcoin price by ${numberToCurrencyLocaleString(
        INC_DEC_BITCOIN_PRICE
      )}`
    })
  );
  dispatch(
    addHistory({
      value: {
        date: new Date().toLocaleString(),
        content: `Decreased Bitcoin price by ${numberToCurrencyLocaleString(
          INC_DEC_BITCOIN_PRICE
        )}`
      }
    })
  );
  dispatch(slice.actions.removeUINotificationInfo());
};

export const reducer = slice.reducer;
