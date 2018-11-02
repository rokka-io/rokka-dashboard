/**
 * graphdata tests
 */

import getStats from '../../../src/components/dashboard/graphdata'
import january from './__tests__/fixtures/january'

// monkey patch Date.prototype.toLocaleDateString() to always use the same locale regardless which env it's run in.
const toLocaleDateString = global.Date.prototype.toLocaleDateString
global.Date.prototype.toLocaleDateString = function() {
  return toLocaleDateString.apply(this, ['en'])
}

test('calculates stats correctly', () => {
  const from = '2017-12-16'
  const to = '2018-01-17'

  const { stats, totals, symbols } = getStats(from, to, january)

  expect(totals).toEqual({
    traffic: 367,
    space: 91,
    files: 353
  })
  expect(symbols).toEqual({
    traffic: 'MB',
    space: 'MB'
  })

  expect(stats).toEqual({
    traffic: [
      { y: 0, name: '12/16/2017' },
      { y: 0, name: '12/17/2017' },
      { y: 0, name: '12/18/2017' },
      { y: 0, name: '12/19/2017' },
      { y: 0, name: '12/20/2017' },
      { y: 0, name: '12/21/2017' },
      { y: 0, name: '12/22/2017' },
      { y: 0, name: '12/23/2017' },
      { y: 0, name: '12/24/2017' },
      { y: 0, name: '12/25/2017' },
      { y: 0, name: '12/26/2017' },
      { y: 0, name: '12/27/2017' },
      { y: 0, name: '12/28/2017' },
      { y: 0, name: '12/29/2017' },
      { y: 0, name: '12/30/2017' },
      { y: 0, name: '12/31/2017' },
      { y: 0, name: '1/1/2018' },
      { y: 0, name: '1/2/2018' },
      { y: 0, name: '1/3/2018' },
      { y: 0, name: '1/4/2018' },
      { y: 0, name: '1/5/2018' },
      { y: 0, name: '1/6/2018' },
      { y: 0, name: '1/7/2018' },
      { y: 0, name: '1/8/2018' },
      { y: 0, name: '1/9/2018' },
      { y: 0, name: '1/10/2018' },
      { y: 49.24, name: '1/11/2018' },
      { y: 201.38, name: '1/12/2018' },
      { y: 1.36, name: '1/13/2018' },
      { y: 0, name: '1/14/2018' },
      { y: 112.09, name: '1/15/2018' },
      { y: 3, name: '1/16/2018' },
      { y: 0, name: '1/17/2018' }
    ],
    space: [
      { y: 0, name: '12/16/2017' },
      { y: 0, name: '12/17/2017' },
      { y: 0, name: '12/18/2017' },
      { y: 0, name: '12/19/2017' },
      { y: 0, name: '12/20/2017' },
      { y: 0, name: '12/21/2017' },
      { y: 0, name: '12/22/2017' },
      { y: 0, name: '12/23/2017' },
      { y: 0, name: '12/24/2017' },
      { y: 0, name: '12/25/2017' },
      { y: 0, name: '12/26/2017' },
      { y: 0, name: '12/27/2017' },
      { y: 0, name: '12/28/2017' },
      { y: 0, name: '12/29/2017' },
      { y: 0, name: '12/30/2017' },
      { y: 0, name: '12/31/2017' },
      { y: 0, name: '1/1/2018' },
      { y: 0, name: '1/2/2018' },
      { y: 0, name: '1/3/2018' },
      { y: 0, name: '1/4/2018' },
      { y: 0, name: '1/5/2018' },
      { y: 0, name: '1/6/2018' },
      { y: 0, name: '1/7/2018' },
      { y: 0, name: '1/8/2018' },
      { y: 0, name: '1/9/2018' },
      { y: 0, name: '1/10/2018' },
      { y: 187.24, name: '1/11/2018' },
      { y: 187.23, name: '1/12/2018' },
      { y: 187.23, name: '1/13/2018' },
      { y: 187.23, name: '1/14/2018' },
      { y: 0, name: '1/15/2018' },
      { y: 91.39, name: '1/16/2018' },
      { y: 0, name: '1/17/2018' }
    ],
    files: [
      { y: 0, name: '12/16/2017' },
      { y: 0, name: '12/17/2017' },
      { y: 0, name: '12/18/2017' },
      { y: 0, name: '12/19/2017' },
      { y: 0, name: '12/20/2017' },
      { y: 0, name: '12/21/2017' },
      { y: 0, name: '12/22/2017' },
      { y: 0, name: '12/23/2017' },
      { y: 0, name: '12/24/2017' },
      { y: 0, name: '12/25/2017' },
      { y: 0, name: '12/26/2017' },
      { y: 0, name: '12/27/2017' },
      { y: 0, name: '12/28/2017' },
      { y: 0, name: '12/29/2017' },
      { y: 0, name: '12/30/2017' },
      { y: 0, name: '12/31/2017' },
      { y: 0, name: '1/1/2018' },
      { y: 0, name: '1/2/2018' },
      { y: 0, name: '1/3/2018' },
      { y: 0, name: '1/4/2018' },
      { y: 0, name: '1/5/2018' },
      { y: 0, name: '1/6/2018' },
      { y: 0, name: '1/7/2018' },
      { y: 0, name: '1/8/2018' },
      { y: 0, name: '1/9/2018' },
      { y: 0, name: '1/10/2018' },
      { y: 211, name: '1/11/2018' },
      { y: 210, name: '1/12/2018' },
      { y: 210, name: '1/13/2018' },
      { y: 210, name: '1/14/2018' },
      { y: 0, name: '1/15/2018' },
      { y: 353, name: '1/16/2018' },
      { y: 0, name: '1/17/2018' }
    ]
  })
})
