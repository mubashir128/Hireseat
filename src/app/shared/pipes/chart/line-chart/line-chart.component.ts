import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  LineChart: [{}];
  lineChartDataSet: any;
  constructor() {
    const recruiter1 = {
      label: "Recruiter1",
      fill: 'false',
      lineTension: '0.2',
      borderColor: "#85e0e0",
      borderWidth: 1,
      data: [5025, 6000, 7025, 8000, 9089, 10098]
    };
    const recruiter2 = {
      label: "Recruiter2",
      fill: 'false',
      lineTension: '0.2',
      borderColor: "#3399ff",
      borderWidth: 1,
      data: [8078, 8100, 8500, 9100, 9100, 9000]
    }
    const recruiter3 = {
      label: "Recruiter3",
      fill: 'false',
      lineTension: '0.2',
      borderColor: "#cc3399",
      borderWidth: 1,
      data: [7001, 7500, 8500, 9035, 9035, 8998]
    };
    const recruiter4 = {
      label: "Recruiter4",
      fill: 'false',
      lineTension: '0.2',
      borderColor: "#79ff4d",
      borderWidth: 1,
      data: [8565, 8201, 7525, 7202, 8010, 7888]
    };
    const recruiter5 = {
      label: "Recruiter5",
      fill: 'false',
      lineTension: '0.2',
      borderColor: "#6666ff",
      borderWidth: 1,
      data: [9025, 8001, 7001, 6002, 6210, 7000]
    };
    this.lineChartDataSet = {
      labels: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June"
      ],
      datasets: [recruiter1, recruiter2, recruiter3, recruiter4, recruiter5]
    };
  }

  ngOnInit() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: this.lineChartDataSet,
      options: {
        title: {
          text: "Chart Title",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
