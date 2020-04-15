import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"]
})
export class LineChartComponent implements OnInit {
  LineChart: [{}];
  lineChartDataSet: any;
  lineOptions: any;
  constructor() {
    const totalRecs = {
      label: "Total Recs",
      fill: "false",
      lineTension: "0",
      borderColor: "#FF0000",
      borderWidth: 3,
      data: [70, 60, 68, 52, 50, 51]
    };
    const fillRate = {
      label: "Fill Rate",
      fill: "false",
      yAxisID: "percent",
      lineTension: "0",
      borderColor: "#8FAADC",
      borderWidth: 3,
      data: [29, 25, 24, 33, 20, 10]
    };
    const AvgFillRate = {
      label: "Avg Fill Rate in Days",
      fill: "false",
      lineTension: "0",
      borderColor: "#5B9BD5",
      borderWidth: 3,
      data: [10, 8, 5, 7, 11, 6]
    };
    this.lineChartDataSet = {
      labels: ["Jan", "Feb", "March", "April", "May", "June"],
      datasets: [totalRecs, AvgFillRate, fillRate]
    };
    this.lineOptions = {
      legend: {
        position: "bottom",
        labels: {
          // fontFamily: "Comic Sans MS",
          boxWidth: 30,
          boxHeight: 0,
          fontSize: 10
        },
        maxSize: {
          height: 0
        }
      },
      title: {
        text: "Aggregate Recruiter Performance",
        display: true
      },
      scales: {
        ticks: {
          beginAtZero: true
        },
        xAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
              display: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
              display: false
            }
          },
          {
            id: "percent",
            type: "linear",
            position: "right",

            ticks: {
              max: 35,
              min: 0,
              callback: function(value, index, values) {
                return value + "%";
              }
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            }
          }
        ]
      },
      elements: {
        line: {
          tension: 0
        },
        point: {
          radius: 0
        }
      },
      bezierCurve: false
    };
  }

  ngOnInit() {
    this.LineChart = new Chart("lineChart", {
      type: "line",
      data: this.lineChartDataSet,
      options: this.lineOptions
    });
  }
}
