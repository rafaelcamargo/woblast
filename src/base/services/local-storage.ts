type LocalStorageService = {
  set: <T>(key: string, data: T) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: (key: string) => any
};

const _public = {} as LocalStorageService;

_public.set = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

_public.get = key => JSON.parse(window.localStorage.getItem(key) as string);

export default _public;
