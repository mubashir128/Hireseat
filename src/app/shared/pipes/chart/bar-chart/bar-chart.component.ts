import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
  BarChart = [{}];
  barChartData = {};
  chartOptions: any;
  data: any;
  constructor() {
    // declairing bar chart data

    // end of creating bar chart data

    this.data = {
      labels: [
        "Recruiter1",
        "Recruiter2",
        "Recruiter3",
        "Recruiter4",
        "Recruiter5",
        "Recruiter6",
        "Recruiter7",
        "Recruiter8",
        "Recruiter9",
        "Recruiter10",
        "Recruiter11",
        "Recruiter12",
        "Recruiter13",
        "Recruiter14",
        "Recruiter15"
      ],
      datasets: [
        {
          label: "Fee",
          //new option, type will default to bar as that what is used to create the scale
          type: "line",
          yAxisID: "rest",
          lineTension: "0",
          borderColor: "red",
          borderWidth: 2,
          fill: false,

          data: [25, 20, 20, 18, 20, 25, 30, 20, 20, 25, 15, 15, 15, 20, 15]
        },
        {
          //new option, type will default to bar as that what is used to create the scale
          type: "bar",
          label: "Score",
          backgroundColor: "#00b0f0",
          borderColor: "#00b0f0",
          borderWidth: 1,
          data: [
            10098,
            9000,
            8998,
            7888,
            7000,
            6050,
            5001,
            2000,
            1998,
            1500,
            1100,
            900,
            800,
            500,
            100
          ]
        }
      ]
    };
    this.chartOptions = {
      responsive: true,
      legend: {
        position: "bottom",
        labels: {
          // fontFamily: "Comic Sans MS",
          boxWidth: 30,
          boxHeight: 1,
          fontSize: 10
        }
      },
      title: {
        display: true,
        text: "Recruiter Performance VS Cost"
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.4,
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
          // {
          //   id: "score",
          //   type: "linear",
          //   position: "left",
          //   ticks: {
          //     beginAtZero: true
          //   },
          //   gridLines: {
          //     color: "rgba(0, 0, 0, 0)"
          //   }
          // },
          {
            id: "rest",
            type: "linear",
            position: "right",

            ticks: {
              max: 30,
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
    this.BarChart = new Chart("barChart", {
      type: "bar",
      data: this.data,
      options: this.chartOptions
    });
  }
}

// {
//         datasets: [
//           {
//             label: "Bar Dataset",
//             data: [10, 20, 30, 40],
//             yAxisID: "score"
//           },
//           {
//             label: "Line Dataset",
//             data: [10, 5, 25, 17],
//             yAxisID: "rest",
//             fill: false,

//             // Changes this dataset to become a line
//             type: "line"
//           }
//         ],
//         labels: ["January", "February", "March", "April"]
//       },
