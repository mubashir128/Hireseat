import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";

@Component({
  selector: 'app-recruiter-line-chart',
  templateUrl: './recruiter-line-chart.component.html',
  styleUrls: ['./recruiter-line-chart.component.css']
})
export class RecruiterLineChartComponent implements OnInit {
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
      data: [70, 60, 68, 52, 50, 51, 10, 20, 30, 45, 11, 15]
    };

    this.lineChartDataSet = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [totalRecs]
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
