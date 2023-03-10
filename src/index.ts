import { pascalCase } from '@/utils/pascalCase';
import type { PascalCase } from 'type-fest';

type BaseArrayValue = ReadonlyArray<PropertyKey>;
type BaseObjectValue = Readonly<Record<PropertyKey, PropertyKey>>;
type BaseValue = BaseArrayValue | BaseObjectValue;

type ArrayValueLiteral<Value extends BaseValue> = Value extends ReadonlyArray<
  infer ArrayValue extends PropertyKey
>
  ? Readonly<{ [Key in ArrayValue]: Key }>
  : never;

type ObjectValueLiteral<Value extends BaseValue> = Value extends BaseObjectValue
  ? Readonly<{ [Key in keyof Value]: Value[Key] }>
  : never;

type ValueLiteral<Value extends BaseValue> = Value extends BaseArrayValue
  ? ArrayValueLiteral<Value>
  : Value extends BaseObjectValue
  ? ObjectValueLiteral<Value>
  : never;

function isArrayValue(value: BaseValue): value is BaseArrayValue {
  return Array.isArray(value);
}

function isObjectValue(value: BaseValue): value is BaseObjectValue {
  return value === Object(value) && !isArrayValue(value);
}

function normalizeValue<Value extends BaseValue>(
  value: Value,
): ValueLiteral<Value> {
  if (isArrayValue(value)) {
    return value.reduce(
      (result, value) => ({ ...result, [value]: value }),
      {} as ValueLiteral<Value>,
    );
  }

  if (isObjectValue(value)) {
    return value as ValueLiteral<Value>;
  }

  throw new Error('Invalid value');
}

export function defineConstant<Value extends BaseValue>(value: Value) {
  const object = normalizeValue(value);
  type ValueObject = typeof object;

  const keys = Object.keys(object) as (keyof ValueObject)[];
  type ValueKey = (typeof keys)[number];

  const values = Object.values(object) as ValueObject[keyof ValueObject][];
  type ValueItem = (typeof values)[number];

  type NarrowerKey<TKey extends ValueKey> = `is${PascalCase<TKey & string>}`;
  const narrowerFunctions = keys.reduce(
    (result, key) => {
      const narrowerKey = `is${pascalCase(String(key))}`;
      const narrowerFunction = (value: unknown) => value === object[key];
      return { ...result, [narrowerKey]: narrowerFunction };
    },
    {} as {
      [TKey in ValueKey as NarrowerKey<TKey>]: (
        value: unknown,
      ) => value is ValueObject[TKey];
    },
  );

  return Object.freeze({
    object,
    keys: Object.freeze(keys),
    values: Object.freeze(values),
    getKey<TValue extends ValueItem>(value: TValue) {
      // TODO: TypeScript should be able to infer the key literal.
      //       Revisit this in future TypeScript versions.
      return keys.find((key) => object[key] === value) as ValueKey;
    },
    getValue<TKey extends ValueKey>(key: TKey) {
      return object[key];
    },
    isKey(key: unknown): key is ValueKey {
      if (typeof key !== 'string') return false;
      return keys.includes(key);
    },
    isValue(value: unknown): value is ValueItem {
      if (typeof value !== 'string') return false;
      return values.includes(value as ValueItem);
    },
    ...narrowerFunctions,
  });
}
