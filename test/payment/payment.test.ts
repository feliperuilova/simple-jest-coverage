import { PaymentService } from '../../src/payment/payment'

describe('PaymentService', () => {

test('creates a payment with a positive amount', () => {
  const payment = new PaymentService(100)

  expect(payment.getAmount()).toBe(100)
})
test('Error with 0 amount', () => {
  expect(() => new PaymentService(0)).toThrow()
})

  test('Error with negative amount', () => {
    expect(() => new PaymentService(-10)).toThrow()
  })

  test('With 0% of discount', () => {
    const payment = new PaymentService(100)
    payment.applyDiscount(0)
    expect(payment.getAmount()).toBe(100)
  })
  test('With 10% of discount', () => {
    const payment = new PaymentService(200)
    payment.applyDiscount(10)
    expect(payment.getAmount()).toBe(180)
  })
  test('With 100% of discount', () => {
    const payment = new PaymentService(50)
    payment.applyDiscount(100)
    expect(payment.getAmount()).toBe(0)
  })
  test('With negative % of discount', () => {
    const payment = new PaymentService(1000)
    payment.applyDiscount(-10)
    expect(payment.getAmount()).toBe(1000)
  })
  test('With a discount above 100%', () => {
    const payment = new PaymentService(150)
    payment.applyDiscount(101)
    expect(payment.getAmount()).toBe(150)
  })
  test('Multiple discounts', () => {
    const payment = new PaymentService(1000)
    payment.applyDiscount(10)
    payment.applyDiscount(20)
    payment.applyDiscount(15)
    expect(payment.getAmount()).toBe(612)
  })
  test('Discount after payment is not applied', () => {
    const payment = new PaymentService(1000)
    payment.pay()
    payment.applyDiscount(100)
    expect(payment.getAmount()).toBe(1000)
  })
  test('succeesful payment', () => {
    const payment = new PaymentService(100)
    const result = payment.pay()
    expect(result).toBe(true)
  })

  test('second payment is false', () => {
    const payment = new PaymentService(10)
    const firstresult =payment.pay()
    const secondresult = payment.pay()
    expect(firstresult).toBe(true)
    expect(secondresult).toBe(false)

  })


})