import { introduceMyself } from '../src';

describe('introduceMyself', () => {
  it('should introduce me', () => {
    expect(introduceMyself('J', 'M')).toEqual('Hello M J');
  });
});
