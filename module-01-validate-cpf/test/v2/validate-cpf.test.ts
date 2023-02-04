//@ts-nocheck
import { test, expect } from '@jest/globals'
import { validateCpf } from '../../src/v2/validate-cpf'

test('should validate when valid CPF', () => {
  expect(validateCpf('650.476.230-92')).toBe(true)
})

test('should validate when valid CPF and first verifing digit is zero', () => {
  expect(validateCpf('876.456.410-02')).toBe(true)
})

test('should validate when valid CPF and second verifing digit is zero', () => {
  expect(validateCpf('400.551.160-00')).toBe(true)
})

test('should validate when valid CPF without special characters', () => {
  expect(validateCpf('65047623092')).toBe(true)
})

test('should validate when no valid CPF', () => {
  expect(validateCpf('650.476.230-82')).toBe(false)
})

test('should validate when null CPF', () => {
  expect(validateCpf()).toBe(false)
})

test('should validate when no valid length characters', () => {
  expect(validateCpf('00000')).toBe(false)
})

test('should validate when is no string parameter', () => {
  expect(validateCpf(65047623092)).toBe(false)
})

test('should validate when is all characters are equals', () => {
  expect(validateCpf('111.111.111-11')).toBe(false)
})
