import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from 'src/utils';
import { LOCALSTORAGE_HISTORY_KEY } from 'src/constants';

interface HistoryItemState {
  date: string;
  content: string;
}

const initialState: HistoryItemState[] = [];

const localStorageInitialState = getLocalStorage(
  LOCALSTORAGE_HISTORY_KEY
) as HistoryItemState[];

const slice = createSlice({
  name: 'history',
  initialState: localStorageInitialState || initialState,
  reducers: {
    addHistory(
      state: HistoryItemState[],
      action: PayloadAction<{ value: HistoryItemState }>
    ) {
      const { value } = action.payload;
      state.unshift(value);
      setLocalStorage(LOCALSTORAGE_HISTORY_KEY, state);
    }
  }
});

export const reducer = slice.reducer;

export const { addHistory } = slice.actions;
