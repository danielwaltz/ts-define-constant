import { describe, it, expect } from 'vitest';
import { defineConstant } from '@/index';

describe('defineConstant', () => {
  it('returns object using array value', () => {
    const { object } = defineConstant(['USER', 'ADMIN'] as const);

    expect(object).toStrictEqual({
      USER: 'USER',
      ADMIN: 'ADMIN',
    });
  });

  it('returns object using object value', () => {
    const { object } = defineConstant({
      USER: 'USER',
      ADMIN: 'ADMIN',
    } as const);

    expect(object).toStrictEqual({
      USER: 'USER',
      ADMIN: 'ADMIN',
    });
  });

  it('returns accurate constant keys', () => {
    const { keys } = defineConstant({
      USER_KEY: 'USER_VALUE',
      ADMIN_KEY: 'ADMIN_VALUE',
    } as const);

    expect(keys).toStrictEqual(['USER_KEY', 'ADMIN_KEY']);
  });

  it('returns accurate constant values', () => {
    const { values } = defineConstant({
      USER_KEY: 'USER_VALUE',
      ADMIN_KEY: 'ADMIN_VALUE',
    } as const);

    expect(values).toStrictEqual(['USER_VALUE', 'ADMIN_VALUE']);
  });

  it('gets value using key', () => {
    const { getValue } = defineConstant({
      USER_KEY: 'USER_VALUE',
      ADMIN_KEY: 'ADMIN_VALUE',
    } as const);

    expect(getValue('USER_KEY')).toStrictEqual('USER_VALUE');
  });

  it('gets key using value', () => {
    const { getKey } = defineConstant({
      USER_KEY: 'USER_VALUE',
      ADMIN_KEY: 'ADMIN_VALUE',
    } as const);

    expect(getKey('USER_VALUE')).toStrictEqual('USER_KEY');
  });

  it('accurately checks if key is constant', () => {
    const { isKey } = defineConstant({
      USER_KEY: 'USER_VALUE',
      ADMIN_KEY: 'ADMIN_VALUE',
    } as const);

    expect(isKey('USER_KEY')).toBe(true);
    expect(isKey('ADMIN_KEY')).toBe(true);
    expect(isKey('ADMIN_VALUE')).toBe(false);
  });

  it('accurately checks if value is constant', () => {
    const { isValue } = defineConstant({
      USER_KEY: 'USER_VALUE',
      ADMIN_KEY: 'ADMIN_VALUE',
    } as const);

    expect(isValue('USER_VALUE')).toBe(true);
    expect(isValue('ADMIN_VALUE')).toBe(true);
    expect(isValue('ADMIN_KEY')).toBe(false);
  });

  it('accurately checks if value is specific constant', () => {
    const { isUserKey, isAdminKey } = defineConstant({
      USER_KEY: 'USER_VALUE',
      ADMIN_KEY: 'ADMIN_VALUE',
    } as const);

    expect(isUserKey('USER_VALUE')).toBe(true);
    expect(isAdminKey('ADMIN_VALUE')).toBe(true);
    expect(isAdminKey('USER_VALUE')).toBe(false);
  });
});
