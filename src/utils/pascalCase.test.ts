import { expect, describe, it } from 'vitest';
import { pascalCase } from '../utils/pascalCase';

describe('pascalCase', () => {
  it('should convert strings to pascal case', () => {
    expect(pascalCase('foo bar')).toBe('FooBar');
    expect(pascalCase('Foo Bar')).toBe('FooBar');
    expect(pascalCase('fooBar')).toBe('FooBar');
    expect(pascalCase('FooBar')).toBe('FooBar');
    expect(pascalCase('--foo-bar--')).toBe('FooBar');
    expect(pascalCase('__FOO_BAR__')).toBe('FooBar');
    expect(pascalCase('!--foo-¿?-bar--121-**%')).toBe('FooBar121');
    expect(pascalCase('Here i am')).toBe('HereIAm');
    expect(pascalCase('FOO BAR')).toBe('FooBar');
    expect(pascalCase('ça.roule')).toBe('ÇaRoule');
    expect(pascalCase('добрий-день')).toBe('ДобрийДень');
  });
});
