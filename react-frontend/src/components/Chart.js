import React, { Component } from "react";
import MyResponsiveLine from "./MyResponsiveLine";
import DatePick from "./DatePick";

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="chart__container">
        <h2>体温変化グラフ</h2>
        <DatePick className="date_pick" />
        <div class="line-chart">
          <MyResponsiveLine />
        </div>
      </div>
    )
  }

}

export default Chart;
