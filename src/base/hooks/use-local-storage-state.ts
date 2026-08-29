import { useState } from 'react';
import localStorageService from '@src/base/services/local-storage';

export function useLocalStorageState<T>(key: string, initialValue: T): [T, (newState: T) => void] {
  const [state, setState] = useState<T>(() => getStoredState(key, initialValue));
  const handleStateChange = (newState: T) => {
    localStorageService.set(key, newState);
    setState(newState);
  };
  return [state, handleStateChange];
}

function getStoredState<T>(key: string, initialValue: T) {
  return localStorageService.get(key) ?? initialValue;
}
