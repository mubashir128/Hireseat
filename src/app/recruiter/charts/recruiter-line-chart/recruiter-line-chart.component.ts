import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { WebsocketService } from 'src/app/_services/websocket.service';
import { Subject } from "rxjs";
import { UserService } from "../../../_services/user.service";

@Component({
  selector: 'app-recruiter-line-chart',
  templateUrl: './recruiter-line-chart.component.html',
  styleUrls: ['./recruiter-line-chart.component.css']
})
export class RecruiterLineChartComponent implements OnInit {
  LineChart;
  lineChartDataConfig: any;
  lineOptions: any;

  getRecruiterLineChartData = "getRecruiterLineChartData";

  recruiterLineChartObserver = new Subject();
  recruiterLineChartObserver$ = this.recruiterLineChartObserver.asObservable();

  loggedInUser: any;
  constructor(private _socket: WebsocketService, private userService: UserService) {
    this.setLineChartConfig();
    this.loggedInUser = this.userService.getUserData();
  }

  async ngOnInit() {
    this.showLineChartData();

    await this._socket.removeListener({ type: 8 });
    this._socket.addListener({
      type: 8,
      callback: this.recruiterLineChartObserver,
    });
    
    this.recruiterLineChartObserver$.subscribe((res: any) => {
      this.handleRecruiterLineChartData(res);
    });
    
    this._socket.sendMessage({
      type: 8,
      data: {
        type: this.loggedInUser.userRole,
        subType: this.getRecruiterLineChartData,
      },
    });

  }

  handleRecruiterLineChartData(res){
    switch (res.subType) {
      case this.getRecruiterLineChartData : 
        this.showChartData(res);
        break;
      default : 
        break;
    }
  }

  showChartData(res){
    this.lineChartDataConfig.datasets[0].data = res.data;
    this.lineChartDataConfig.labels = res.result;
    this.LineChart.update();
  }

  showLineChartData(){
    this.LineChart = new Chart("lineChart", {
      type: "line",
      data: this.lineChartDataConfig,
      options: this.lineOptions
    });
  }

  setLineChartConfig(){
    const totalRecs = {
      label: "Total Recs",
      fill: true,
      lineTension: 0,
      borderColor: "#0aafff",
      backgroundColor : '#0aafff',
      borderWidth: 2,
      data: [0, 0, 0, 0, 0, 0, 0],
      borderDash: [0, 0],
      pointBorderColor: 'black',
      pointBackgroundColor: 'rgba(255, 150, 0, 0.3)',
      pointRadius: 1,
      pointHoverRadius: 5,
      pointHitRadius: 5,
      pointBorderWidth: 1,
      pointStyle: 'rectRounded'
    };

    this.lineChartDataConfig = {
      labels: ["Sunday", "Monday", "Tuesday", "Wednesday" ,"Thursday", "Friday", "Saturday"],
      datasets: [totalRecs]
    };
    
    this.lineOptions = {
      responsive: true,
      legend: {
        display: false,
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
        text: "Candidates Helped",
        display: true
      },
      scales: {
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          },
        },
        xLabelRotation : -45,
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxRotation: 45,
              minRotation: 45
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
              beginAtZero: true,
              // stepSize: 1,
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
              display: false
            }
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

}
