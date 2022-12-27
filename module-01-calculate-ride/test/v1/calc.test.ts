import { test, expect } from '@jest/globals'
import { calc } from '../../src/v1/calc'

test('Should calculate ride at normal time', () => {
  const fare = calc([{dist: 10 , ds: new Date('2022-12-27T12:00:00')}])
  expect(fare).toBe(21)
})

test('Should calculate ride on Sunday at normal time', () => {
  const fare = calc([{dist: 10, ds: new Date('2022-12-25T12:00:00')}])
  expect(fare).toBe(29)
})

test('Should calculate ride at night time', () => {
  const fare = calc([{dist: 10, ds: new Date('2022-12-26T23:00:00')}])
  expect(fare).toBe(39)
})

test('Should calculate rice on Sunday at night time', () => {
  const fare = calc([{dist: 10, ds: new Date('2022-12-25T23:00:00')}])
  expect(fare).toBe(50)
})

test('Should not calculate ride if date is invalid', () => {
  const fare = calc([{dist : 10, ds: new Date('invalid')}])
  expect(fare).toBe(-2)
})

test('Should not calculate ride if distance is invalid', () => {
  const fare = calc([{ dist: -8, ds: new Date('2022-12-27T12:00:00')}])
  expect(fare).toBe(-1)
})

test('Should calculate ride with minimum value', () => {
  const fare = calc([{dist: 1, ds: new Date('2022-12-27T12:00:00') }])
  expect(fare).toBe(10)
})
