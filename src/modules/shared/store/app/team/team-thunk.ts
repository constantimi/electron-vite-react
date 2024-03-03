import AppAPI from '../../../constants/appApi';
import {
  ActiveTeam,
  teamActiveSchema,
} from '../../../types/team/teamValidator';
import { ThunkMethod, createAppAsyncThunk } from '../../thunk';

export const loadActiveTeam = createAppAsyncThunk<ActiveTeam>()(
  ThunkMethod.get,
  (id?: string) => `${AppAPI.endpoints().teams}/${id}`,
  {
    name: 'loadActiveTeam',
    error: 'Something went wrong while updating the team.',
    responseProperty: 'data',
  },
  undefined,
  undefined,
  teamActiveSchema.safeParse
);
