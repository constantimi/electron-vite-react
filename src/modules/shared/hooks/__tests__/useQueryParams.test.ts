import { renderHook } from '@testing-library/react';
import { useQueryParams } from '../useQueryParams';

const mockLocation = {
  pathname: '',
  search: '?param1=value1&param2=value2',
  state: null,
  key: '',
  hash: '',
};

const useLocationMock = jest.fn(() => mockLocation);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => useLocationMock(),
}));

beforeEach(() => {
  useLocationMock.mockClear();
});

describe('useQueryParams', () => {
  it('returns the URL search params', () => {
    useLocationMock.mockReturnValue(mockLocation);

    const { result } = renderHook(() => useQueryParams());

    const queryParams = result.current;

    expect(queryParams.get('param1')).toBe('value1');
    expect(queryParams.get('param2')).toBe('value2');
  });
});
