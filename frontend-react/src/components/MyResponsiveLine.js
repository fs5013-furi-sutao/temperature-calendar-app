import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import moment from 'moment'

import BodyTemperatureService from '../services/BodyTemperatureService'

/**
 * https://github.com/plouc/nivo
 */
class MyResponsiveLine extends React.Component {
  constructor() {
    super()

    let legend = [
      {
        id: '体温変化',
        color: 'hsl(356, 70%, 50%)',
        data: [],
      },
    ]

    const today = new Date()
    const startDateStr = moment(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14)
    ).format('yyyy-MM-DD')
    const endDateStr = moment(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)
    ).format('yyyy-MM-DD')

    BodyTemperatureService.getTemperatureByDateBetween(
      startDateStr,
      endDateStr
    ).then((res) => {
      legend[0].data = res.data

      legend[0].data = legend[0].data.map((e) => ({
        x: e.date,
        y: e.temperature,
      }))
      this.forceUpdate()
    })

    this.state = {
      data: legend,
    }
  }

  getAlert(startDate, endDate) {
    const startDateStr = moment(startDate).format('yyyy-MM-DD')
    const endDateStr = moment(endDate).format('yyyy-MM-DD')
    let legend = [
      {
        id: '体温変化',
        color: 'hsl(356, 70%, 50%)',
        data: [],
      },
    ]
    BodyTemperatureService.getTemperatureByDateBetween(
      startDateStr,
      endDateStr
    ).then((res) => {
      legend[0].data = res.data

      legend[0].data = legend[0].data.map((e) => ({
        x: e.date,
        y: e.temperature,
      }))

      this.setState({ data: legend })
      this.forceUpdate()
    })
  }

  render() {
    return (
      <ResponsiveLine
        data={this.state.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: '35.0',
          max: '39.0',
          stacked: true,
          reverse: false,
        }}
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '日付',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '体温',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        lineWidth={4}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.1}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            justify: true,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    )
  }
}

export default MyResponsiveLine
