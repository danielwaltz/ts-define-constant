# TS Define Constant [![npm](https://img.shields.io/npm/v/ts-define-constant.svg)](https://npmjs.com/package/ts-define-constant)

Type safe utility for defining static constants with automatic type narrowing and additional helper functions. Zero dependencies.

## Install

```shell
# npm
npm i ts-define-constant

# yarn
yarn add ts-define-constant

# pnpm
pnpm i ts-define-constant
```

## Usage

Import and define your constants using the provided `defineConstant` function.

Supports passing in a plain object or an array of strings as the first argument.

```ts
import { defineConstant } from 'ts-define-constant';

const {
  /* Plain object containing the constants */
  object,
  /* Array of the keys */
  keys,
  /* Array of the values */
  values,
  /* Function that returns the key of a given value */
  getKey,
  /* Function that returns the value of a given key */
  getValue,
  /* Function that returns true if the given value is a key of the constants */
  isKey,
  /* Function that returns true if the given value is a value of the constants */
  isValue,
  /* Function that returns true if the given value is equal to the USER constant */
  isUser,
  /* Function that returns true if the given value is equal to the ADMIN constant */
  isAdmin,
} = defineConstant({ USER: 'USER', ADMIN: 'ADMIN' });
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
  isKey: isUserRoleKey,
  isValue: isUserRoleValue,
  isUser,
  isAdmin,
} = defineConstant({ USER: 'USER', ADMIN: 'ADMIN' });

export const {
  object: SORT_ORDERS,
  keys: SORT_ORDER_KEYS,
  values: SORT_ORDER_VALUES,
  getKey: getSortOrderKey,
  getValue: getSortOrderValue,
  isKey: isSortOrderKey,
  isValue: isSortOrderValue,
  isAsc,
  isDesc,
} = defineConstant({ ASC: 'ASC', DESC: 'DESC' });
```
