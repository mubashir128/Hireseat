import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Chart } from "chart.js";
import { WebsocketService } from "src/app/_services/websocket.service";
import { Subject } from "rxjs";
import { UserService } from "../../../_services/user.service";
import { SubscriberslistService } from "src/app/_services/subscriberslist.service";

@Component({
  selector: "app-recruiter-doughnut-chart",
  templateUrl: "./recruiter-doughnut-chart.component.html",
  styleUrls: ["./recruiter-doughnut-chart.component.css"],
})
export class RecruiterDoughnutChartComponent implements OnInit, OnDestroy {
  chartOptions: any;
  chartObj: any;
  DaughnutChart;
  daughnutChartDataConfig: any;
  chartColor = ["#0aafff", "#E0DFDF"];

  getDoughnutChartData = "getDoughnutChartData";
  getAllRecruiterComment = "getAllRecruiterComment";

  doughnutObserver = new Subject();
  doughnutObserver$ = this.doughnutObserver.asObservable();

  public CandidateFrm: FormGroup;
  candidateReferredCount = 0;
  candidateHelpedCount = 0;
  candidateThanksCount = 0;
  candidateCommentsCount = 0;

  totalText = "";
  targetText = "";
  totalScore = "Total Score";
  targetScore = "Target Score";

  allComments = [];

  loggedInUser: any;
  constructor(
    private formBuilder: FormBuilder,
    private _socket: WebsocketService,
    private userService: UserService,
    private _subList: SubscriberslistService
  ) {
    this.setDaughnutChartConfig();
    this.loggedInUser = this.userService.getUserData();

    this.CandidateFrm = this.formBuilder.group({
      // tags: ["", Validators.required],
    });
  }

  async ngOnInit() {
    this.showDaughnutChartData();

    this.changeText();

    await this._socket.removeListener({ type: 6 });
    this._socket.addListener({
      type: 6,
      callback: this.doughnutObserver,
    });

    this.doughnutObserver$.subscribe((res: any) => {
      this.handleDoughnutChartData(res);
    });

    this._socket.sendMessage({
      type: 6,
      data: {
        type: this.loggedInUser.userRole,
        subType: this.getDoughnutChartData,
      },
    });

    this._socket.sendMessage({
      type: 6,
      data: {
        type: this.loggedInUser.userRole,
        subType: this.getAllRecruiterComment,
      },
    });

    console.log(this.loggedInUser);

    this._subList.recruiterPoints$.subscribe((res: any) => {
      this.handleRecruiterPoints(res);
    });
  }

  handleRecruiterPoints(res) {
    switch (res.pointer) {
      case "ratingPoints":
        this.changeTotalAndTargetText(res);
        // this.userProfile[res.pointer] += res.increseCount;
        break;
    }
  }

  setDaughnutChartConfig() {
    this.daughnutChartDataConfig = {
      labels: ["Total score", "Target score"],
      datasets: [
        {
          labels: [],
          data: [50, 20],
          backgroundColor: this.chartColor,
          // borderColor : ["black", "black"],
          // borderWidth : 0.5
        },
      ],
    };

    this.chartOptions = {
      // onClick: this.handleLineChartClick,
      cutoutPercentage: 90,
      responsive: true,
      legend: {
        position: "bottom",
        labels: {
          // fontFamily: "Comic Sans MS",
          boxWidth: 30,
          boxHeight: 1,
          fontSize: 14,
        },
      },
      title: {
        display: true,
        text: "Recruiter Performance",
        fontSize: 16,
      },
      centerText: true,
      // scales: {
      //   xAxes: [
      //     {
      //       barPercentage: 0.4,
      //       gridLines: {
      //         color: "rgba(0, 0, 0, 0)",
      //         display: false
      //       }
      //     }
      //   ],
      // yAxes: [
      //   {
      //     ticks: {
      //       beginAtZero: true
      //     },
      //     gridLines: {
      //       color: "rgba(0, 0, 0, 0)",
      //       display: false
      //     }
      //   },
      //   {
      //     id: "rest",
      //     type: "linear",
      //     position: "right",

      //     ticks: {
      //       max: 100,
      //       min: 0,
      //       callback: function (value, index, values) {
      //         return value + "%";
      //       }
      //     },
      //     gridLines: {
      //       color: "rgba(0, 0, 0, 0)"
      //     }
      //   }
      // ]
      // },
      // elements: {
      //   line: {
      //     tension: 0
      //   },
      //   point: {
      //     radius: 0
      //   }
      // },
      bezierCurve: false,
    };
  }

  handleDoughnutChartData(res) {
    switch (res.subType) {
      case this.getDoughnutChartData:
        this.showChartData(res);
        break;
      case this.getAllRecruiterComment : 
        res.data.forEach(item => {
          this.allComments = item;
        });
        break;
      default:
        break;
    }
  }

  showChartData(res) {
    this.candidateReferredCount = res.data.sharePoints
      ? res.data.sharePoints / 200
      : 0;
    this.candidateHelpedCount = res.data.advicePoints
      ? res.data.advicePoints / 100
      : 0;
    this.candidateThanksCount = res.data.adviceLikedPoints
      ? res.data.adviceLikedPoints / 50
      : 0;
    this.candidateCommentsCount = res.data.ReplyAdvicePoints
      ? res.data.ReplyAdvicePoints / 25
      : 0;

    this.daughnutChartDataConfig.datasets[0].data[0] = res.data.ratingPoints;

    let firstNum = 0;
    let secondNum = 999;

    while (true) {
      if (
        res.data.ratingPoints >= firstNum &&
        res.data.ratingPoints <= secondNum
      ) {
        this.daughnutChartDataConfig.datasets[0].data[1] =
          secondNum - res.data.ratingPoints;
        // this.targetText = (secondNum - res.data.ratingPoints) + '';
        this.targetText = secondNum + 1 + "";
        break;
      } else {
        firstNum = secondNum;
        secondNum += 1000;
      }
    }

    this.totalText = res.data.ratingPoints + "";

    this.changeText();
    this.DaughnutChart.update();
  }

  changeTotalAndTargetText(res) {
    let firstNum = 0;
    let secondNum = 999;
    let totalvalue = parseInt(this.totalText) + res.increseCount;
    this.totalText = totalvalue + "";

    while (true) {
      if (totalvalue >= firstNum && totalvalue <= secondNum) {
        this.targetText = secondNum + 1 + "";
        break;
      } else {
        firstNum = secondNum;
        secondNum += 1000;
      }
    }

    this.changeText();
    this.DaughnutChart.update();
  }

  changeText() {
    let THIS = this;
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.options.centerText) {
          var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

          ctx.restore();
          var fontSize = (height / 250).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          var text = THIS.totalText;
          let textX = Math.round((width - ctx.measureText(text).width) / 2);
          let textY = height / 2 - 50;

          ctx.fillStyle = "blue";

          ctx.textColor = "red";
          ctx.fillText(text, textX, textY + 30);
          ctx.fillText(THIS.totalScore, textX - 15, textY + 45);

          ctx.fillStyle = "red";
          ctx.textColor = "gray";
          var text2 = THIS.targetText;
          ctx.fillText(text2, textX, textY + 70);
          ctx.fillText(THIS.targetScore, textX - 20, textY + 85);

          ctx.save();
        }
      },
    });
  }

  handleLineChartClick() {
    this.chartObj = this;
  }

  showDaughnutChartData() {
    this.DaughnutChart = new Chart("doughnutChart", {
      type: "doughnut",
      data: this.daughnutChartDataConfig,
      options: this.chartOptions,
    });
  }

  ngOnDestroy() {
    this.totalText = "";
    this.targetText = "";
    this.totalScore = "";
    this.targetScore = "";
    this.changeText();
  }
}
