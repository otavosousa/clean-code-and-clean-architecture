//@ts-nocheck
import { test, expect } from '@jest/globals'
import { validate } from '../../src/v1/validate'

test('should validate when valid CPF', () => {
  expect(validate('650.476.230-92')).toBe(true)
})

test('should validate when valid CPF and first verifing digit is zero', () => {
  expect(validate('876.456.410-02')).toBe(true)
})

test('should validate when valid CPF and second verifing digit is zero', () => {
  expect(validate('400.551.160-00')).toBe(true)
})

test('should validate when valid CPF without special characters', () => {
  expect(validate('65047623092')).toBe(true)
})

test('should validate when no valid CPF', () => {
  expect(validate('650.476.230-82')).toBe(false)
})

test('should validate when null CPF', () => {
  expect(validate()).toBe(false)
})

test('should validate when no valid length characters', () => {
  expect(validate('00000')).toBe(false)
})

test('should validate when is no string parameter', () => {
  expect(validate(65047623092)).toBe(false)
})
