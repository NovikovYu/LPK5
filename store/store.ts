import { configureStore } from '@reduxjs/toolkit';

import { accessKeySlice } from '@/store/slices/sessionSlice';

export const store = configureStore({
  reducer: {
    accessKey: accessKeySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
