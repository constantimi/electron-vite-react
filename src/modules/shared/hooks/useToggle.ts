import { useState, useCallback } from 'react';

const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle] as const;
};

export default useToggle;
