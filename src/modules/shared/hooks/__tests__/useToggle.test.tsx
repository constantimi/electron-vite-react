import { act, renderHook } from '@testing-library/react';
import useToggle from '../useToggle';

describe('useToggle hook', () => {
  it('Returns a boolean and toggle function', () => {
    const { result } = renderHook(() => useToggle());
    const [value, toggle] = result.current;

    expect(value).toBe(false);
    expect(toggle).toBeDefined();
  });

  it('changes toggle value to true when called', () => {
    const { result } = renderHook(() => useToggle());
    const [value, toggle] = result.current;

    expect(value).toBe(false);

    act(() => toggle());

    const [newValue] = result.current;

    expect(newValue).toBe(true);
  });
});
