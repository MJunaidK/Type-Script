import { borgName } from '../src';

describe('borgName', () => {
  it('should give me a borg name', () => {
    const myName = borgName();
    const out = myName.match(/^Your Borg name is (\d+) of (\d+)$/);
    if (out) {
      const [_, n1, n2] = out;
      expect(parseInt(n1) <= parseInt(n2)).toBeTruthy();
    }
  });
});
