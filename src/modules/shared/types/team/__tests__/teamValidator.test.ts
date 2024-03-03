import {
  teamBaseSchema,
  teamUserSchema,
  teamWithUsersSchema,
} from '../teamValidator';

describe('Team Validators', () => {
  it('should validate a team user correctly', () => {
    const validUser = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      id: '1234',
      teamRole: 'admin',
      userName: 'johndoe',
    };

    const invalidUser = {
      email: 'test@example',
      firstName: 'John',
      lastName: 'Doe',
      id: '1234',
      teamRole: 'admin',
      userName: 3,
    };

    const validUserResult = teamUserSchema.safeParse(validUser);
    const invalidUserResult = teamUserSchema.safeParse(invalidUser);

    expect(validUserResult.success).toBe(true);
    expect(invalidUserResult.success).toBe(false);
  });

  it('should validate a team base correctly', () => {
    const validTeam = {
      id: '1234',
      avatar_url: 'https://example.com/avatar.png',
      name: 'Team A',
      archived: false,
      workspace_id: '4321',
    };

    const invalidTeam = {
      id: '1234',
      avatar_url: 'https://example.com/avatar.png',
      name: '',
      archived: 'false',
      workspace_id: '4321',
    };

    const validTeamResult = teamBaseSchema.safeParse(validTeam);
    const invalidTeamResult = teamBaseSchema.safeParse(invalidTeam);

    expect(validTeamResult.success).toBe(true);
    expect(invalidTeamResult.success).toBe(false);
  });

  it('should validate a team with users correctly', () => {
    const validTeamWithUsers = {
      id: '1234',
      avatar_url: 'https://example.com/avatar.png',
      name: 'Team A',
      archived: false,
      workspace_id: '4321',
      users: [
        {
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          id: '1234',
          teamRole: 'admin',
          userName: 'johndoe',
        },
      ],
    };

    const invalidTeamWithUsers = {
      id: '1234',
      avatar_url: 'https://example.com/avatar.png',
      name: 'Team A',
      archived: 'false',
      workspace_id: '4321',
      users: [
        {
          email: 'test@example',
          firstName: 'John',
          lastName: 'Doe',
          id: '1234',
          teamRole: 'admin',
          userName: 'johndoe',
        },
      ],
    };

    const validTeamWithUsersResult =
      teamWithUsersSchema.safeParse(validTeamWithUsers);
    const invalidTeamWithUsersResult =
      teamWithUsersSchema.safeParse(invalidTeamWithUsers);

    expect(validTeamWithUsersResult.success).toBe(true);
    expect(invalidTeamWithUsersResult.success).toBe(false);
  });
});
