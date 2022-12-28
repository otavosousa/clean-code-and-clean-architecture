import { test, expect } from '@jest/globals'
import { calculateRide } from '../../src/v2/calculate-ride'

test('Should calculate ride at normal time', () => {
  const fare = calculateRide([{distance: 10 , date: new Date('2022-12-27T12:00:00')}])
  expect(fare).toBe(21)
})

test('Should calculate ride on Sunday at normal time', () => {
  const fare = calculateRide([{distance: 10, date: new Date('2022-12-25T12:00:00')}])
  expect(fare).toBe(29)
})

test('Should calculate ride at night time', () => {
  const fare = calculateRide([{distance: 10, date: new Date('2022-12-26T23:00:00')}])
  expect(fare).toBe(39)
})

test('Should calculate rice on Sunday at night time', () => {
  const fare = calculateRide([{distance: 10, date: new Date('2022-12-25T23:00:00')}])
  expect(fare).toBe(50)
})

test('Should not calculate ride if date is invalid', () => {
  expect(() => {
    calculateRide([{distance: 10, date: new Date('invalid')}])
  }).toThrow('Invalid Date')
})

test('Should not calculate ride if distance is invalid', () => {
  expect(() => {
    calculateRide([{ distance: -8, date: new Date('2022-12-27T12:00:00')}])
  }).toThrow('Invalid Distance')
})

test('Should calculate ride with minimum value', () => {
  const fare = calculateRide([{distance: 1, date: new Date('2022-12-27T12:00:00') }])
  expect(fare).toBe(10)
})
