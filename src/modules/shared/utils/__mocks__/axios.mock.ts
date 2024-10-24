const get = jest.fn();
const post = jest.fn();
const put = jest.fn();
const deleteMock = jest.fn();

export const axiosMock = {
  get,
  post,
  put,
  delete: deleteMock,
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
  isAxiosError: jest.fn(),
};

export const jwtdecodeMock = jest.fn();
export const setJwtPayload = (usr: { ur: string; role: string; ws: string }) =>
  jwtdecodeMock.mockImplementation(() => usr);

beforeEach(() => {
  jwtdecodeMock.mockImplementation(() => ({
    ur: 'random',
    role: 'USER',
    ws: 'test',
  }));
});

jest.mock('axios', () => ({
  create: () => axiosMock,
}));

jest.mock('jwt-decode', () => jwtdecodeMock);
