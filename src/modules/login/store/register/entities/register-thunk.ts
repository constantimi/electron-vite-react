import AuthAPI from '../../../../shared/constants/authApi';
import {
  ThunkMethod,
  createAppAsyncThunk,
} from '../../../../shared/store/thunk';
import { RegisterRequest } from '../../../types/register';

const registerThunk = createAppAsyncThunk<undefined>()(
  ThunkMethod.post,
  () => AuthAPI.endpoints().register,
  {
    name: 'register',
    error: 'No register loading',
    responseProperty: 'data',
  },
  (bodyArgs: RegisterRequest | undefined) => bodyArgs,
  undefined,
  undefined
);

export default registerThunk;
