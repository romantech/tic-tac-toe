import { useEffect, useRef, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const readValue = useRef((): T => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  const [storedValue, setStoredValue] = useState<T>(readValue.current);

  const setValue: (value: T | ((val: T) => T)) => void = (value) => {
    if (typeof window == 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      );
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue.current());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue.current());
    };

    // 다른 탭, 윈도우에서 로컬 스토리지 변경시 호출 (현재 탭 이벤트는 감지 못함)
    window.addEventListener('storage', handleStorageChange);
    // 현재 탭의 로컬 스토리지 변경시 호출
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, []);

  return [storedValue, setValue] as const;
};
