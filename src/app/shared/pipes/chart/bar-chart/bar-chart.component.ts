import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  BarChart = [{}];
  barChartData = {};
  chartOptions: any;
  constructor() {
    // declairing bar chart data
    this.barChartData = {
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
          label: "Score",
          yAxisID: 'score',
          backgroundColor: "#85e0e0",
          borderColor: "#85e0e0",
          borderWidth: 1,
          data: [10098,
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
            100,
          ]
        },
        {
          label: "AVG Number of Days",
          backgroundColor: "red",
          borderColor: "red",
          borderWidth: 1,
          yAxisID: 'rest',
          data: [3,
            3,
            3,
            3,
            4,
            2,
            5,
            7,
            8,
            9,
            9,
            10,
            15,
            20,
            25
          ]
        },
        {
          label: "# of Submissions",
          backgroundColor: "gray",
          borderColor: "gray",
          borderWidth: 1,
          yAxisID: 'rest',
          data: [20,
            18,
            15,
            12,
            11,
            6,
            5,
            5,
            5,
            4,
            3,
            4,
            1
          ]
        },
        {
          label: "# of Interviews",
          backgroundColor: "yellow",
          borderColor: "yellow",
          borderWidth: 1,
          yAxisID: 'rest',
          data: [16,
            14,
            11,
            8,
            7,
            3,
            2,
            2,
            2,
            2,
            1,
            1,
            1,
            1,
            0
          ]
        },
        {
          label: "# of Hires",
          backgroundColor: "green",
          borderColor: "green",
          borderWidth: 1,
          yAxisID: 'rest',
          data: [10,
            7,
            6,
            5,
            3,
            2,
            1,
            1,
            1,
            1,
            1,
            0,
            0,
            0,
            0
          ]
        }
      ]
    };
    // end of creating bar chart data
    this.chartOptions = {
      responsive: true,
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Chart Title"
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }, {
          id: 'score',
          type: 'linear',
          position: 'left'
        },
        {
          id: 'rest',
          type: 'linear',
          position: 'right',
          ticks: {
            max: 30,
            min: 0
          }
        }
        ]
      }
    }
  }

  ngOnInit() {
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: this.barChartData,
      options: this.chartOptions
    });

  }

}
