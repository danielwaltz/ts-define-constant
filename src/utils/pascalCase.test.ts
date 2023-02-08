import { expect, describe, it } from 'vitest';
import { pascalCase } from '@/utils/pascalCase';

describe('pascalCase', () => {
  it('should convert CONSTANT_CASE to PascalCase', () => {
    expect(pascalCase('CONSTANT_CASE')).toBe('ConstantCase');
  });
});
