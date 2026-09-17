import dateService from './date';

describe('Date Service', () => {
  it('should return now as date', () => {
    const now = new Date();
    const serviceNow = dateService.getNow();
    expect(now.getDate()).toEqual(serviceNow.getDate());
    expect(now.getMonth()).toEqual(serviceNow.getMonth());
    expect(now.getFullYear()).toEqual(serviceNow.getFullYear());
  });

  it('should format full month and year', () => {
    expect(dateService.formatFullMonthYear({ month: '06', year: '2027', locale: 'pt-BR' })).toEqual('junho 2027');
  });
});
