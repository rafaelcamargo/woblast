type IdService = {
  generateId: () => string
};

const ID_CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const _public = {} as IdService;

_public.generateId = () => {
  return Array.from({ length: 6 }, pickRandomCharacter).join('');
};

function pickRandomCharacter() {
  return ID_CHARACTERS[Math.floor(Math.random() * ID_CHARACTERS.length)];
}

export default _public;
