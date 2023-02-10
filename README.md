# TS Define Constant

Type safe utility for defining static constants with additional helper functions.

## Install Plugin

```bash
# npm
npm i -D ts-define-constant

# yarn
yarn add -D ts-define-constant

# pnpm
pnpm i -D ts-define-constant
```

## Usage

Import and define your constants using the provided `defineConstant` function.

Supports passing in a plain object or an array of strings as the first argument. Planning support for TypeScript enums in the future.

> :warning: The `defineConstant` function requires a type assertion on the passed in value using `as const` to work properly!

```ts
import { defineConstant } from 'ts-define-constant';

const {
  object, // The plain object containing the constants
  keys, // An array of the keys of the constants
  values, // An array of the values of the constants
  getKey, // A function that returns the key of a given value
  getValue, // A function that returns the value of a given key
  isUser, // A function that returns true if the given value is equal to the USER constant
  isAdmin, // A function that returns true if the given value is equal to the ADMIN constant
} = defineConstant({ USER: 'USER', ADMIN: 'ADMIN' } as const);
```

An example of what this looks like when multiple constants are defined and exported from a shared `constants.ts` file:

```ts
// constants.ts
import { defineConstant } from 'ts-define-constant';

export const {
  object: USER_ROLES,
  keys: USER_ROLE_KEYS,
  values: USER_ROLE_VALUES,
  getKey: getUserRoleKey,
  getValue: getUserRoleValue,
  isUser,
  isAdmin,
} = defineConstant({ USER: 'USER', ADMIN: 'ADMIN' } as const);

export const {
  object: SORT_ORDERS,
  keys: SORT_ORDER_KEYS,
  values: SORT_ORDER_VALUES,
  getKey: getSortOrderKey,
  getValue: getSortOrderValue,
  isAsc,
  isDesc,
} = defineConstant({ ASC: 'ASC', DESC: 'DESC' } as const);
```
