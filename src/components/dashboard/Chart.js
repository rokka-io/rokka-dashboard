import React, { PropTypes } from 'react'
import HighCharts from 'react-highcharts'

const Chart = ({ data, type, yPointSymbol = null }) => {
  const config = {
    title: {
      text: null
    },
    chart: {
      type,
      height: 200
    },
    plotOptions: {
      series: {
        animation: false,
        tooltip: {
          hideDelay: 0,
          headerFormat: '',
          pointFormat: '{point.y}'
        }
      },
      bar: {
        groupPadding: 0
      },
      column: {
        minPointLength: 1
      }
    },
    yAxis: {
      title: { enabled: false },
      opposite: true,
      lineWidth: 0,
      minorGridLineWidth: 0,
      gridLineColor: 'transparent',
      minorTickLength: 0,
      tickLength: 0,
      labels: {
        style: {
          font: '12px "Liip Etica Book", sans-serif'
        }
      }
    },
    xAxis: {
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      minorTickLength: 0,
      tickLength: 0,
      labels: {
        style: {
          font: '12px "Liip Etica Book", sans-serif'
        }
      },
      type: 'category'
    },
    series: [{
      showInLegend: false,
      data
    }],
    colors: ['#6EA644'],
    tooltip: {
      animation: false,
      shadow: false,
      padding: 5,
      backgroundColor: '#6EA644',
      borderColor: '#4d852c',
      borderWidth: 2,
      borderRadius: 4,
      style: {
        color: '#fff',
        font: '14px "Liip Etica Semibold", sans-serif'
      },
      valueSuffix: yPointSymbol
    },
    credits: {
      enabled: false
    }
  }

  return (
    <HighCharts config={config} />
  )
}
Chart.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  yPointSymbol: PropTypes.string
}

export default Chart
