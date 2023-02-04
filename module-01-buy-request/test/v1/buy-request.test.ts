import { test, expect } from '@jest/globals'
import { BuyRequest } from '../../src/v1/BuyRequest'
import { Item } from '../../src/v1/Item'

test('should not create a buy request with invalid cpf', () => {
  const buyRequest = new BuyRequest()
  expect(() => {
    buyRequest.create('55795478030')
  }).toThrow('Invalid CPF')
})

test('should create a buy request with three items', () => {
  const buyRequest = new BuyRequest()
  const item1 = new Item({description: 'iPhone', price: 15000, amount: 2 })
  const item2 = new Item({description: 'iMac', price: 20000, amount: 1 })
  const item3 = new Item({description: 'iPad', price: 10000, amount: 5 })
  buyRequest.addItems([item1, item2, item3])
  buyRequest.create('55795478032')
  expect(buyRequest.items.length).toBe(3)
})

test('should create a buy request with discount', () => {
  const buyRequest = new BuyRequest()
  const item1 = new Item({description: 'iPhone', price: 15000, amount: 2 })
  const item2 = new Item({description: 'iMac', price: 20000, amount: 1 })
  const item3 = new Item({description: 'iPad', price: 10000, amount: 5 })
  buyRequest.addItems([item1, item2, item3])
  buyRequest.applyDiscount(10)
  buyRequest.create('55795478032')
  expect(buyRequest.total).toBe(90000)
})
