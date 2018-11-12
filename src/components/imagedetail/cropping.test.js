import {
  calculateScale,
  scalePosition,
  calculateRenderedPosition,
  pixelToPercent
} from './cropping'

test('calculateScale', () => {
  expect(calculateScale(100, 1000)).toBe(0.1)
})

test('scalePosition', () => {
  const { x, y } = scalePosition({ x: 2, y: 2 }, 2)
  expect(x).toBe(4)
  expect(y).toBe(4)
})

test('calculateRenderedPosition', () => {
  const { x, y } = calculateRenderedPosition(0.2, 100, { x: 50, y: 20 })

  expect(x).toBe(200)
  expect(y).toBe(50)
})

test('pixelToPercent', () => {
  const crop = {
    x: 20,
    y: 10,
    width: 200,
    height: 400
  }
  const { x, y, width, height } = pixelToPercent(crop, 400, 800)

  expect(x).toBe(5)
  expect(y).toBe(1.25)
  expect(width).toBe(50)
  expect(height).toBe(50)
})
