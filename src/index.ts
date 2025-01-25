import { pascalCase } from "./utils/pascalCase";
import type { PascalCase } from "type-fest";

type BaseArrayValue = ReadonlyArray<PropertyKey>;
type BaseObjectValue = Readonly<Record<PropertyKey, PropertyKey>>;
type BaseValue = BaseArrayValue | BaseObjectValue;

type ArrayValueLiteral<TValue extends BaseValue> =
  TValue extends ReadonlyArray<infer ArrayValue extends PropertyKey>
    ? Readonly<{ [Key in ArrayValue]: Key }>
    : never;

type ObjectValueLiteral<TValue extends BaseValue> =
  TValue extends BaseObjectValue
    ? Readonly<{ [Key in keyof TValue]: TValue[Key] }>
    : never;

type ValueLiteral<TValue extends BaseValue> = TValue extends BaseArrayValue
  ? ArrayValueLiteral<TValue>
  : TValue extends BaseObjectValue
    ? ObjectValueLiteral<TValue>
    : never;

function isArrayValue(value: BaseValue): value is BaseArrayValue {
  return Array.isArray(value);
}

function isObjectValue(value: BaseValue): value is BaseObjectValue {
  return value === Object(value) && !isArrayValue(value);
}

function normalizeValue<const TValue extends BaseValue>(
  value: TValue,
): ValueLiteral<TValue> {
  if (isArrayValue(value)) {
    return value.reduce(
      (result, value) => ({ ...result, [value]: value }),
      {} as ValueLiteral<TValue>,
    );
  }

  if (isObjectValue(value)) {
    return value as ValueLiteral<TValue>;
  }

  throw new Error("Invalid value");
}

export function defineConstant<const TValue extends BaseValue>(value: TValue) {
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
    getKey<const TValue extends ValueItem>(value: TValue) {
      return keys.find((key) => object[key] === value)!;
    },
    getValue<const TKey extends ValueKey>(key: TKey) {
      return object[key];
    },
    isKey(key: unknown): key is ValueKey {
      // @ts-expect-error allow unknown
      return keys.includes(key);
    },
    isValue(value: unknown): value is ValueItem {
      // @ts-expect-error allow unknown
      return values.includes(value);
    },
    ...narrowerFunctions,
  });
}
