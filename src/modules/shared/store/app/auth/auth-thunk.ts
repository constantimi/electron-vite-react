import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosClient } from '../../../utils/axios';

export const refreshAccessToken = createAsyncThunk<
  string,
  { refreshToken: string }
>('auth/refreshAccessToken', async ({ refreshToken }, thunkAPI) => {
  try {
    return AxiosClient.RefreshToken(refreshToken);
  } catch (refreshError) {
    // Handle refresh token failure (e.g., logout, show an error message, etc.)
    AxiosClient.clearTokens();
    return thunkAPI.rejectWithValue('Unauthorized');
  }
});
