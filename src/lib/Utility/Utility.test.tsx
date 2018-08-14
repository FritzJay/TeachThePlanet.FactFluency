import { padString } from "./Utility";

describe('padString', () => {
  it('concatenates until the length of `str` is >= `length`', () => {
    expect(padString('', 3)).toEqual('   ');
  });

  it('does not affect strings that already have a length of `length`', () => {
    expect(padString(' ', 1)).toEqual(' ');
  });

  it('pads using the given `char`', () => {
    expect(padString('', 3, '.')).toEqual('...');
  });

  it('can pad the left side', () => {
    expect(padString('1', 3, ' ')).toEqual('  1');
  });

  it('can pad the right side', () => {
    expect(padString('1', 3, ' ', false)).toEqual('1  ');
  });

  it('works with numbers', () => {
    expect(padString(3, 2)).toEqual(' 3');
  });

  it('treats undefined as an empty string', () => {
    expect(padString(undefined, 2)).toEqual('  ');
  });

  it('treats null as an empty string', () => {
    expect(padString(null, 2)).toEqual('  ');
  });
});