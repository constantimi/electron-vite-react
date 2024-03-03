import { useSelector } from 'react-redux';

const mock = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: mock,
}));

beforeEach(() => {
  mock.mockClear();
});

export const useSelectorMock = mock as jest.MockedFunction<typeof useSelector>;
