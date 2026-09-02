import idService from './id';

describe('Id Service', () => {
  it('should generate a six-character id using only alphanumeric characters', () => {
    const id = idService.generateId();
    expect(id).toHaveLength(6);
    expect(id).toMatch(/^[0-9a-zA-Z]{6}$/);
  });
});
