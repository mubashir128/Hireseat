import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-recruiter-bar-chart",
  templateUrl: "./recruiter-bar-chart.component.html",
  styleUrls: ["./recruiter-bar-chart.component.css"],
})
export class RecruiterBarChartComponent implements OnInit {
  chartOptions: any;
  data: any;
  chartObj: any;
  BarChart;

  constructor() {
    this.data = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      datasets: [
        {
          data: [10, 20, 30],
          labels: ["Red", "Yellow", "Blue"],
        },
      ],
    };

    this.chartOptions = {
      onClick: this.handleLineChartClick,
      responsive: true,
      legend: {
        position: "bottom",
        labels: {
          // fontFamily: "Comic Sans MS",
          boxWidth: 30,
          boxHeight: 1,
          fontSize: 20,
        },
      },
      title: {
        display: true,
        text: "Recruiter Performance VS Cost",
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.4,
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
              display: false,
            },
          },
        ],
        // yAxes: [
        //   {
        //     ticks: {
        //       beginAtZero: true
        //     },
        //     gridLines: {
        //       color: "rgba(0, 0, 0, 0)",
        //       display: false
        //     }
        //   },
        //   {
        //     id: "rest",
        //     type: "linear",
        //     position: "right",

        //     ticks: {
        //       max: 100,
        //       min: 0,
        //       callback: function (value, index, values) {
        //         return value + "%";
        //       }
        //     },
        //     gridLines: {
        //       color: "rgba(0, 0, 0, 0)"
        //     }
        //   }
        // ]
      },
      elements: {
        line: {
          tension: 0,
        },
        point: {
          radius: 0,
        },
      },
      bezierCurve: false,
    };
  }

  ngOnInit() {
    this.renderBarChartData();
  }

  handleLineChartClick() {
    this.chartObj = this;
  }

  renderBarChartData() {
    this.BarChart = new Chart("barChart", {
      type: "barChart",
      data: this.data,
      options: this.chartOptions,
    });
  }
}
