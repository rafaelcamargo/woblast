import { useEffect, useState } from 'react';
import localStorageService from '@src/base/services/local-storage';

export function useLocalStorageState<T>(key: string, initialValue: T): [T, (newState: T | null) => void] {
  const [state, setState] = useState<T>(() => getStoredState(key, initialValue));
  const handleStateChange = (newState: T | null) => {
    if (newState === null) {
      window.localStorage.removeItem(key);
    } else {
      localStorageService.set(key, newState);
    }
    setState(newState as T);
  };

  useEffect(() => {
    if (window.localStorage.getItem(key) !== null) {
      localStorageService.set(key, state);
    }
  }, []);

  return [state, handleStateChange];
}

function getStoredState<T>(key: string, initialValue: T) {
  return localStorageService.get(key) ?? initialValue;
}
