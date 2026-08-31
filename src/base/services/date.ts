type DateService = {
  getNow: () => Date
};

const _public = {} as DateService;

_public.getNow = () => new Date();

export default _public;
