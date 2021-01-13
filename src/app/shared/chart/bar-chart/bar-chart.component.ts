import { Component, OnInit, Input } from "@angular/core";
import { Chart } from "chart.js";
import { Subject } from "rxjs";
import { WebsocketService } from "src/app/_services/websocket.service";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
  topRecruiters = [];
  biddingDetails = [];
  BarChart;
  barChartData = {};
  chartOptions: any;
  data: any;
  chartObj: any;
  labels = [];
  ratingPoints = [];
  selectedCount = [];
  @Input() recruiterData;
  barChartObserver = new Subject();
  barChartObserver$ = this.barChartObserver.asObservable();

  constructor(private _socket: WebsocketService) {

    this.data = {
      labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      datasets: [
        {
          label: "Fee",
          // new option, type will default to bar as that what is used to create the scale
          type: "line",
          yAxisID: "rest",
          lineTension: "0",
          borderColor: "red",
          borderWidth: 3,
          fill: false,
          data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
          // new option, type will default to bar as that what is used to create the scale
          type: "bar",
          label: "Score",
          backgroundColor: "#00b0f0",
          borderColor: "#00b0f0",
          borderWidth: 1,
          data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }
      ]
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
          {
            id: "rest",
            type: "linear",
            position: "right",

            ticks: {
              max: 100,
              min: 0,
              callback: function (value, index, values) {
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

  async ngOnInit() {

    this.renderBarChartData();

    await this._socket.removeListener({ type: 4 });
    this._socket.addListener({
      type: 4,
      callback: this.barChartObserver
    });

    this.barChartObserver$.subscribe((res: any) => {
      this.handleBarChartData(res);
    });

    this._socket.sendMessage({
      type: 4,
      data: {
        subType: "getAllBarChartData"
      }
    });

  }

  async handleBarChartData(res: any) {
    switch (res.subType) {
      case "getAllBarChartData":
        this.topRecruiters = res.data.result;
        this.biddingDetails = res.data.data;
        await this.updateData(res.data);
        await this.handleData(res.data.result, res.data.data);
        this.data.labels = this.labels;
        this.data.datasets[1].data = this.ratingPoints;
        this.data.datasets[0].data = this.selectedCount;
        this.BarChart.update();
        break;
      case "increaseRatingPoints":
        this.updateBarChartRatingPoints(res.data);
        break;
      case "increaseHiredCount":
        this.updateBarChartHiredCount(res.data);
        break;
      case "pushNewCreatedBid":
        this.pushNewCreatedBid(res.data);
        break;
      default:
        break;
    }
  }

  pushNewCreatedBid(data) {
    for (let i = 0; i < this.topRecruiters.length; i++) {
      if (this.topRecruiters[i]._id === data.recruiterKey) {
        this.biddingDetails.push(data);
        break;
      }
    }
  }

  updateBarChartRatingPoints(obj) {
    let count = 0;
    this.topRecruiters.map(item => {
      if (item._id === obj._id) {
        this.ratingPoints[count] = obj.ratingPoints;
        this.data.datasets[1].data = this.ratingPoints;
        this.BarChart.update();
      }
      count++;
    });
  }

  async updateBarChartHiredCount(obj) {
    await this.biddingDetails.map(bid => {
      if (bid._id === obj.bidId) {
        bid.hired = true;
      }
    });
    this.selectedCount = [];
    await this.handleData(this.topRecruiters, this.biddingDetails);
    this.data.datasets[0].data = this.selectedCount;
    this.BarChart.update();
  }

  renderBarChartData() {
    this.BarChart = new Chart("barChart", {
      type: "bar",
      data: this.data,
      options: this.chartOptions
    });
  }

  async updateData(res) {
    await res.result.map(item => {
      this.labels.push(item.fullName);
      this.ratingPoints.push(item.ratingPoints);
    });
  }

  async handleData(result, data) {
    await result.map(item => {
      let count = 0;
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        if (item._id === data[i].recruiterKey && data[i].hired) {
          count++;
          sum += data[i].recAvg;
        }
        if (i === data.length - 1) {
          Number.isNaN(sum / count) ? this.selectedCount.push(0) : this.selectedCount.push(sum / count);
        }
      }
    });
  }

  handleLineChartClick() {
    this.chartObj = this;
  }

}
