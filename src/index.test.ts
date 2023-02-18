import { describe, it, expect } from 'vitest';
import { defineConstant } from '@/index';

describe('defineConstant', () => {
  it('returns object using array value', () => {
    const { object } = defineConstant(['FOO', 'BAR'] as const);

    expect(object).toStrictEqual({
      FOO: 'FOO',
      BAR: 'BAR',
    });
  });

  it('returns object using object value', () => {
    const { object } = defineConstant({
      FOO: 'FOO',
      BAR: 'BAR',
    } as const);

    expect(object).toStrictEqual({
      FOO: 'FOO',
      BAR: 'BAR',
    });
  });

  it('returns accurate constant keys', () => {
    const { keys } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expect(keys).toStrictEqual(['FOO_KEY', 'BAR_KEY']);
  });

  it('returns accurate constant values', () => {
    const { values } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expect(values).toStrictEqual(['FOO_VALUE', 'BAR_VALUE']);
  });

  it('gets value using key', () => {
    const { getValue } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expect(getValue('FOO_KEY')).toStrictEqual('FOO_VALUE');
  });

  it('gets key using value', () => {
    const { getKey } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expect(getKey('FOO_VALUE')).toStrictEqual('FOO_KEY');
  });

  it('accurately checks if key is constant', () => {
    const { isKey } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expect(isKey('FOO_KEY')).toBe(true);
    expect(isKey('BAR_KEY')).toBe(true);
    expect(isKey('BAR_VALUE')).toBe(false);
  });

  it('accurately checks if value is constant', () => {
    const { isValue } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expect(isValue('FOO_VALUE')).toBe(true);
    expect(isValue('BAR_VALUE')).toBe(true);
    expect(isValue('BAR_KEY')).toBe(false);
  });

  it('accurately checks if value is specific constant', () => {
    const { isFooKey, isBarKey } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expect(isFooKey('FOO_VALUE')).toBe(true);
    expect(isBarKey('BAR_VALUE')).toBe(true);
    expect(isBarKey('FOO_VALUE')).toBe(false);
  });
});
