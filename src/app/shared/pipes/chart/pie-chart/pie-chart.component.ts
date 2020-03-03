import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"]
})
export class PieChartComponent implements OnInit {
  PieChart: [{}];
  data: any;

  constructor() {
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
          label: "AVG Number of Days",
          backgroundColor: "#FF0000",
          borderColor: "#FF0000",
          borderWidth: 1,
          data: [3, 3, 3, 3, 4, 2, 5, 7, 8, 9, 9, 10, 15, 25]
        },
        {
          label: "# of Submissions",
          backgroundColor: "#B4C7E7",
          borderColor: "#B4C7E7",
          borderWidth: 1,
          data: [20, 18, 15, 12, 11, 6, 5, 5, 5, 4, 3, 3, 3, 4, 1]
        },
        {
          label: "# of Interviews",
          backgroundColor: "#8FAADC",
          borderColor: "#8FAADC",
          borderWidth: 1,
          data: [16, 14, 11, 8, 7, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0]
        },
        {
          label: "# of Hires",
          backgroundColor: "#00B0F0",
          borderColor: "#00B0F0",
          borderWidth: 1,
          data: [10, 7, 6, 5, 3, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0]
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
              }
            }
          ]
        }
      }
    });
  }
}
