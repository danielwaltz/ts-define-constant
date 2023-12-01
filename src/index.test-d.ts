import { describe, it, expectTypeOf } from 'vitest';
import { defineConstant } from './index';

describe('defineConstant', () => {
  it('properly types constant output', () => {
    const { object, keys, values } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expectTypeOf(object).toEqualTypeOf<
      Readonly<{ FOO_KEY: 'FOO_VALUE'; BAR_KEY: 'BAR_VALUE' }>
    >();

    expectTypeOf(keys).toEqualTypeOf<ReadonlyArray<'FOO_KEY' | 'BAR_KEY'>>();

    expectTypeOf(values).toEqualTypeOf<
      ReadonlyArray<'FOO_VALUE' | 'BAR_VALUE'>
    >();
  });

  it('accurately narrows the type of keys', () => {
    const { getKey } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    // TODO: TypeScript should be able to infer the key literal.
    //       Revisit this in future TypeScript versions.
    //       @ts-expect-error - Expected type to be inferred.
    expectTypeOf(getKey('FOO_VALUE')).toEqualTypeOf<'FOO_KEY'>();
    expectTypeOf(getKey('BAR_VALUE')).not.toEqualTypeOf<'FOO_KEY'>();
  });

  it('accurately narrows the type of values', () => {
    const { getValue } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expectTypeOf(getValue('FOO_KEY')).toEqualTypeOf<'FOO_VALUE'>();
    expectTypeOf(getValue('BAR_KEY')).not.toEqualTypeOf<'FOO_VALUE'>();
  });

  it('accurately narrows the type of keys', () => {
    const { isKey } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expectTypeOf(isKey).guards.toEqualTypeOf<'FOO_KEY' | 'BAR_KEY'>();
    expectTypeOf(isKey).not.guards.toEqualTypeOf<'FOO_VALUE' | 'BAR_VALUE'>();
  });

  it('accurately narrows the type of values', () => {
    const { isValue } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expectTypeOf(isValue).guards.toEqualTypeOf<'FOO_VALUE' | 'BAR_VALUE'>();
    expectTypeOf(isValue).not.guards.toEqualTypeOf<'FOO_KEY' | 'BAR_KEY'>();
  });

  it('accurately narrows the type of individual values', () => {
    const { isFooKey, isBarKey } = defineConstant({
      FOO_KEY: 'FOO_VALUE',
      BAR_KEY: 'BAR_VALUE',
    } as const);

    expectTypeOf(isFooKey).guards.toEqualTypeOf<'FOO_VALUE'>();
    expectTypeOf(isBarKey).guards.toEqualTypeOf<'BAR_VALUE'>();
  });
});
