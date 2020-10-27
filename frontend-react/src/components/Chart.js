import React, { Component } from 'react'
import MyResponsiveLine from './MyResponsiveLine'
import DatePick from './DatePick'

class Chart extends Component {
  constructor(props) {
    super(props)

    // if (this.state == null) {
    //   this.state = {
    //     startDate: '2020-10-01',
    //     endDate: '2020-10-30',
    //   }
    // }
    this.ChildRef = React.createRef()
  }

  updateState({ startDate, endDate }) {
    this.setState({ startDate, endDate }, () => {
      this.ChildRef.current.getAlert(startDate, endDate)
    })
  }

  render() {
    return (
      <div class="chart__container">
        <h2>体温変化グラフ</h2>
        <DatePick
          className="date_pick"
          updateState={this.updateState.bind(this)}
        />
        <div class="line-chart">
          <MyResponsiveLine ref={this.ChildRef} />
        </div>
      </div>
    )
  }
}

export default Chart
