import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { ActiveTeam } from '../../../types/team/teamValidator';
import { RootState } from '../..';
import { SessionStore } from '../../../utils/session';
import { loadActiveTeam } from './team-thunk';

export type Status = {
  code: number;
  loading: boolean;
  msg: string;
};

export type TeamStoreSchema = {
  loaded: boolean;
  status: Status;
  team: ActiveTeam;
};

const initialState: TeamStoreSchema = {
  loaded: false,
  status: {
    code: -1,
    loading: false,
    msg: '',
  },
  team: {
    team_id: '',
    slug: '',
    avatar_url: '',
    workspace_id: '',
    name: '',
    team_role: '',
    archived: false,
  },
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setInitialState: (state) => {
      state.status.code = initialState.status.code;
      state.status.loading = initialState.status.loading;
      state.status.msg = initialState.status.msg;

      state.team = { ...initialState.team };
      state.loaded = initialState.loaded;
    },
    setActiveTeam: (state, action: PayloadAction<Partial<ActiveTeam>>) => {
      state.team = { ...state.team, ...action.payload };
      if (action.payload.slug) {
        SessionStore.setActiveTeamSlug(action.payload.slug);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadActiveTeam.pending, (state) => {
        state.status.code = -1;
        state.status.msg = '';
        state.status.loading = true;
      })
      .addCase(loadActiveTeam.fulfilled, (state, action) => {
        state.status.code = 200;
        state.status.msg = '';
        state.status.loading = false;

        state.team = { ...state.team, ...action.payload };
        SessionStore.setActiveTeamSlug(action.payload.slug);

        state.loaded = true;
      })
      .addCase(loadActiveTeam.rejected, (state) => {
        state.status.code = 403;
        state.status.msg = 'forbidden';
        state.status.loading = false;
      });
  },
});

export default teamSlice.reducer;

export const { setInitialState, setActiveTeam } = teamSlice.actions;

export const getTeamSelector = createSelector(
  [(state: RootState) => state.app.team.team],
  (team) => ({
    teamId: team.team_id,
    teamSlug: team.slug,
    teamName: team.name,
    teamAvatar: team.avatar_url,
    teamRole: team.team_role,
  })
);

export const getTeamStatus = (state: RootState) => state.app.team.status;

export const getTeamStatusSelector = createSelector(
  [getTeamStatus],
  (status) => ({
    teamCode: status.code,
    teamLoading: status.loading,
    teamMessage: status.msg,
  })
);

export const teamLoaded = createSelector(
  (state: RootState) => state.app.team.loaded,
  (s) => s
);
