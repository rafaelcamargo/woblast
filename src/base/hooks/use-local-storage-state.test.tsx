import { act, renderHook } from '@src/base/services/testing';
import { useLocalStorageState } from './use-local-storage-state';

describe('Use Local Storage State Hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should use the initial value when the storage key is empty', () => {
    const { result } = renderHook(() => useLocalStorageState('wt_example', { count: 1 }));
    expect(result.current[0]).toEqual({ count: 1 });
  });

  it('should hydrate state from local storage when the key already has a value', () => {
    window.localStorage.setItem('wt_example', JSON.stringify({ count: 2 }));
    const { result } = renderHook(() => useLocalStorageState('wt_example', { count: 1 }));
    expect(result.current[0]).toEqual({ count: 2 });
  });

  it('should persist state changes to local storage', () => {
    const { result } = renderHook(() => useLocalStorageState('wt_example', { count: 1 }));
    act(() => {
      result.current[1]({ count: 3 });
    });
    expect(result.current[0]).toEqual({ count: 3 });
    expect(JSON.parse(window.localStorage.getItem('wt_example') as string)).toEqual({ count: 3 });
  });
});
