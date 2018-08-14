import { padString } from "./Utility";

describe('padString', () => {
  it('concatenates until the length of `str` is >= `length`', () => {
    expect(padString('', ' ', 3)).toEqual('   ');
  });

  it('does not affect strings that already have a length of `length`', () => {
    expect(padString(' ', ' ', 1)).toEqual(' ');
  });

  it('pads using the given `char`', () => {
    expect(padString('', '.', 3)).toEqual('...');
  });
});