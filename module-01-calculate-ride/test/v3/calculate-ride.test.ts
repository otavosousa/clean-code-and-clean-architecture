import { test, expect } from '@jest/globals'
import { Ride } from '../../src/v3/Ride'
import { Segment } from '../../src/v3/Segment'

test('Should calculate ride at normal time', () => {
  const segment = new Segment(10, new Date('2022-12-27T12:00:00'))
  const fare = new Ride([segment]).calculate()
  expect(fare).toBe(21)
})

test('Should calculate ride on Sunday at normal time', () => {
  const segment = new Segment(10, new Date('2022-12-25T12:00:00'))
  const fare = new Ride([segment]).calculate()
  expect(fare).toBe(29)
})

test('Should calculate ride at night time', () => {
  const segment = new Segment(10, new Date('2022-12-26T23:00:00'))
  const fare = new Ride([segment]).calculate()
  expect(fare).toBe(39)
})

test('Should calculate rice on Sunday at night time', () => {
  const segment = new Segment(10, new Date('2022-12-25T23:00:00'))
  const fare = new Ride([segment]).calculate()
  expect(fare).toBe(50)
})

test('Should not calculate ride if date is invalid', () => {
  expect(() => {
    const segment = new Segment(10, new Date('invalid'))
    new Ride([segment]).calculate()
  }).toThrow('Invalid Date')
})

test('Should not calculate ride if distance is invalid', () => {
  expect(() => {
    const segment = new Segment(-10, new Date('2022-12-27T12:00:00'))
    new Ride([segment]).calculate()
  }).toThrow('Invalid Distance')
})

test('Should calculate ride with minimum value', () => {
  const segment = new Segment(1, new Date('2022-12-27T12:00:00'))
  const fare = new Ride([segment]).calculate()
  expect(fare).toBe(10)
})
