import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";

@Component({
  selector: 'app-recruiter-pie-chart',
  templateUrl: './recruiter-pie-chart.component.html',
  styleUrls: ['./recruiter-pie-chart.component.css']
})
export class RecruiterPieChartComponent implements OnInit {
  PieChart: [{}];
  data: any;
  constructor() {
    this.data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "AVG Number of Days",
          backgroundColor: "#FF0000",
          borderColor: "#FF0000",
          borderWidth: 1,
          data: [3, 3, 3, 3, 4, 2, 5, 7, 8, 9, 9, 10]
        },
        {
          label: "# of Submissions",
          backgroundColor: "#B4C7E7",
          borderColor: "#B4C7E7",
          borderWidth: 1,
          data: [20, 18, 15, 12, 11, 6, 5, 5, 5, 4, 3, 3]
        }
      ]
    };
  }

  ngOnInit() {
    this.PieChart = new Chart("PieChart", {
      type: "bar",
      data: this.data,
      options: {
        legend: {
          position: "bottom",
          labels: {
            // fontFamily: "Comic Sans MS",
            boxWidth: 8,
            boxHeight: 0,
            fontSize: 10
          },
          maxSize: {
            height: 0
          }
        },
        title: {
          text: "Recruiter Performance Breakdown",
          display: true
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: true
              }
            }
          ],
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
          ]
        },
        bezierCurve: false
      }
    });
  }

}
