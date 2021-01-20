import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { WebsocketService } from "src/app/_services/websocket.service";
import { Subject } from "rxjs";
import { UserService } from "../../../_services/user.service";

@Component({
  selector: "app-recruiter-pie-chart",
  templateUrl: "./recruiter-pie-chart.component.html",
  styleUrls: ["./recruiter-pie-chart.component.css"],
})
export class RecruiterPieChartComponent implements OnInit {
  PieChart;
  pieChartDataSet: any;

  getRecruiterPieChartData = "getRecruiterPieChartData";

  recruiterPieChartObserver = new Subject();
  recruiterPieChartObserver$ = this.recruiterPieChartObserver.asObservable();

  loggedInUser: any;
  constructor(
    private _socket: WebsocketService,
    private userService: UserService
  ) {
    this.setPieChartConfig();
    this.loggedInUser = this.userService.getUserData();
  }

  async ngOnInit() {
    this.showPieChart();

    await this._socket.removeListener({ type: 7 });
    this._socket.addListener({
      type: 7,
      callback: this.recruiterPieChartObserver,
    });

    this.recruiterPieChartObserver$.subscribe((res: any) => {
      this.handleRecruiterPieChartData(res);
    });

    this._socket.sendMessage({
      type: 7,
      data: {
        type: this.loggedInUser.userRole,
        subType: this.getRecruiterPieChartData,
      },
    });
  }

  setPieChartConfig() {
    this.pieChartDataSet = {
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
          label: "Candidate helped / month.",
          backgroundColor: "#0aafff",
          // borderColor: "#0aafff",
          borderWidth: 1,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          label: "Candidates Referred / month.",
          backgroundColor: "#6495ED",
          // borderColor: "#B4C7E7",
          borderWidth: 1,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };
  }

  handleRecruiterPieChartData(res) {
    switch (res.subType) {
      case this.getRecruiterPieChartData:
        this.putDataIntoFirstPieBar(res);
        break;
      default:
        break;
    }
  }

  putDataIntoFirstPieBar(res) {
    this.pieChartDataSet.datasets[0].data = res.data;
    this.pieChartDataSet.datasets[1].data = res.sharePoints;
    // this.pieChartDataSet.datasets[1].data = [(res.data[0]/res.monthRange[0]) * 100, (res.data[1]/res.monthRange[1]) * 100, (res.data[2]/res.monthRange[2]) * 100, (res.data[3]/res.monthRange[3]) * 100, (res.data[4]/res.monthRange[4]) * 100, (res.data[5]/res.monthRange[5]) * 100, (res.data[6]/res.monthRange[6]) * 100, (res.data[7]/res.monthRange[7]) * 100, (res.data[8]/res.monthRange[8]) * 100, (res.data[9]/res.monthRange[9]) * 100, (res.data[10]/res.monthRange[10]) * 100, (res.data[11]/res.monthRange[11]) * 100];

    this.PieChart.update();
  }

  showPieChart() {
    this.PieChart = new Chart("PieChart", {
      type: "bar",
      data: this.pieChartDataSet,
      options: {
        legend: {
          position: "bottom",
          labels: {
            // fontFamily: "Comic Sans MS",
            boxWidth: 8,
            boxHeight: 0,
            fontSize: 15,
          },
          maxSize: {
            height: 0,
          },
        },
        title: {
          text: "Candidate helped / month.",
          display: true,
          fontSize: 15,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                // stepSize: 1,
                callback: function (value) {
                  if (value % 1 === 0) {
                    return value;
                  }
                },
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: true,
              },
            },
            // {
            //   id: "percent",
            //   type: "linear",
            //   position: "right",

            //   ticks: {
            //     max: 100,
            //     min: 0,
            //     callback: function(value, index, values) {
            //       return value + "%";
            //     }
            //   },
            //   gridLines: {
            //     color: "rgba(0, 0, 0, 0)"
            //   }
            // }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: false,
              },
            },
          ],
        },
        bezierCurve: false,
      },
    });
  }
}
