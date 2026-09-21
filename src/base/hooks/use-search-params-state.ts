import { useSearchParams } from 'react-router-dom';

type SearchParamType = 'number';

export function useSearchParamsState<T extends Record<string, number>>(
  initialValue: T,
  types: { [K in keyof T]: SearchParamType }
): [T, (value: (prev: T) => T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const state = parseSearchParamsState(searchParams, initialValue, types);
  const setState = (value: (prev: T) => T) => {
    setSearchParams(
      prev => serializeSearchParamsState(prev, value(state)),
      { replace: true }
    );
  };

  return [state, setState];
}

function parseSearchParamsState<T extends Record<string, number>>(
  searchParams: URLSearchParams,
  initialValue: T,
  types: { [K in keyof T]: SearchParamType }
): T {
  return Object.keys(initialValue).reduce((result, key) => {
    const urlValue = searchParams.get(key);
    if (urlValue === null) return result;
    const parsed = getSearchParamValueParser(types[key])(urlValue);
    return {
      ...result,
      [key]: Number.isNaN(parsed) ? initialValue[key] : parsed
    };
  }, { ...initialValue });
}

function serializeSearchParamsState<T extends Record<string, number>>(
  searchParams: URLSearchParams,
  state: T
): URLSearchParams {
  const result = new URLSearchParams(searchParams);
  Object.keys(state).forEach(key => {
    result.set(key, String(state[key]));
  });
  return result;
}

function getSearchParamValueParser(searchParamType: SearchParamType) {
  return {
    number: Number
  }[searchParamType];
}
