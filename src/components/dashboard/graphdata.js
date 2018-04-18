import moment from 'moment'
import filesize from 'filesize'

const SYMBOL_EXPONENT = {
  B: 0,
  KB: 1,
  MB: 2,
  GB: 3,
  TB: 4,
  PB: 5,
  EB: 6
}

function toChartData ({ value, timestamp }, exponent = null) {
  return {
    y: exponent ? filesize(value, { exponent, output: 'object' }).value : value,
    // unix timestamp is in seconds, need it in miliseconds
    name: moment(timestamp).toDate().toLocaleDateString()
  }
}

function generateStatsPerDay (perDay, stats, exponent = null) {
  const timestamps = stats.map((stat, index) => ({ index, value: moment(stat.timestamp).valueOf() }))
  stats = timestamps.map(stat => stats[stat.index])

  const data = []
  let statsIdx = 0
  for (let i = 0; i < perDay.length; i++) {
    const currStats = stats[statsIdx] || null
    if (!currStats) {
      data.push(toChartData({value: 0, timestamp: perDay[i]}))
      continue
    }
    if (perDay[i].isSame(currStats.timestamp, 'day')) {
      data.push(toChartData(currStats, exponent))
      statsIdx++
    } else {
      data.push(toChartData({value: 0, timestamp: perDay[i]}))
    }
  }
  if (statsIdx !== stats.length) {
    console.error('Invalid date ranges in stats', {
      statsIdx,
      length: stats.length,
      perDay,
      stats
    })
  }
  return data
}

// eslint-disable-next-line camelcase
function transformData (statsPerDay, { bytes_downloaded, space_in_bytes, number_of_files }, trafficExponent, spaceExponent) {
  return {
    traffic: generateStatsPerDay(statsPerDay, bytes_downloaded, trafficExponent),
    space: generateStatsPerDay(statsPerDay, space_in_bytes, spaceExponent),
    files: generateStatsPerDay(statsPerDay, number_of_files)
  }
}

// eslint-disable-next-line camelcase
function getTotals ({ bytes_downloaded, space_in_bytes, number_of_files }) {
  const currentSpaceUsed = space_in_bytes[space_in_bytes.length - 1]
  const currentFilesUsed = number_of_files[number_of_files.length - 1]
  return {
    traffic: bytes_downloaded.reduce((acc, data) => acc + data.value, 0),
    space: currentSpaceUsed ? currentSpaceUsed.value : 0,
    files: currentFilesUsed ? currentFilesUsed.value : 0
  }
}

/**
 *
 * @param {moment} from
 * @param {moment} to
 * @param {Object} data
 * @returns {{stats: ({traffic, space, files}|*), totals: ({traffic, space, files}|*), symbols: {traffic: *, space: *}}}
 */
export default function getStats (from, to, data) {
  from = moment(from)
  const daysDiff = moment(to).diff(from, 'days') + 1 // One is added because the API return one less
  const statsPerDay = Array(daysDiff).fill().map((_, i) => from.clone().add(i, 'day'))

  const sortedData = {
    bytes_downloaded: data.bytes_downloaded.sort((a, b) => moment(a.timestamp) - moment(b.timestamp)),
    number_of_files: data.number_of_files.sort((a, b) => moment(a.timestamp) - moment(b.timestamp)),
    space_in_bytes: data.space_in_bytes.sort((a, b) => moment(a.timestamp) - moment(b.timestamp))
  }

  const totals = getTotals(sortedData)

  // eslint-disable-next-line camelcase
  const { bytes_downloaded, space_in_bytes } = sortedData
  const averageTraffic = bytes_downloaded.length ? totals.traffic / bytes_downloaded.length : 0
  const averageSpace = space_in_bytes.length ? totals.space / space_in_bytes.length : 0
  const average = {
    traffic: filesize(averageTraffic, {output: 'object'}),
    space: filesize(averageSpace, {output: 'object'})
  }

  const trafficExponent = SYMBOL_EXPONENT[average.traffic.symbol]
  const spaceExponent = SYMBOL_EXPONENT[average.space.symbol]

  totals.traffic = filesize(totals.traffic, {exponent: trafficExponent, round: 0, output: 'object'}).value
  totals.space = filesize(totals.space, {exponent: spaceExponent, round: 0, output: 'object'}).value

  return {
    stats: transformData(statsPerDay, sortedData, trafficExponent, spaceExponent),
    totals: totals,
    symbols: {
      traffic: average.traffic.symbol,
      space: average.space.symbol
    }
  }
}
