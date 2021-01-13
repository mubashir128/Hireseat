import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from "chart.js";
import { WebsocketService } from 'src/app/_services/websocket.service';
import { Subject } from "rxjs";
import { UserService } from "../../../_services/user.service";

@Component({
  selector: 'app-recruiter-doughnut-chart',
  templateUrl: './recruiter-doughnut-chart.component.html',
  styleUrls: ['./recruiter-doughnut-chart.component.css']
})
export class RecruiterDoughnutChartComponent implements OnInit, OnDestroy {

  chartOptions: any;
  chartObj: any;
  DaughnutChart;
  daughnutChartDataConfig: any;
  chartColor = ["#0aafff", "#E0DFDF"];

  getDoughnutChartData = "getDoughnutChartData";

  doughnutObserver = new Subject();
  doughnutObserver$ = this.doughnutObserver.asObservable();

  public CandidateFrm: FormGroup;
  candidateHelpedCount = 0;
  candidateThanksCount = 0;
  candidateCommentsCount = 0;
  
  totalText = '';
  targetText = '';
  totalScore  = "Total Score";
  targetScore = "Target Score";

  loggedInUser: any;
  constructor(private formBuilder: FormBuilder, private _socket: WebsocketService, private userService: UserService) {
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

  }

  setDaughnutChartConfig(){
    this.daughnutChartDataConfig = {
      labels: ["Total score", "Target score"],
      datasets: [{
          labels : [],
          data: [50, 20],
          backgroundColor : this.chartColor,
          // borderColor : ["black", "black"],
          // borderWidth : 0.5
        }
      ]
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
          fontSize: 10
        }
      },
      title: {
        display: true,
        text: "Recruiter Performance"
      },
      centerText : true,
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
      bezierCurve: false
    };
  }

  handleDoughnutChartData(res){
    switch (res.subType) {
      case this.getDoughnutChartData :
        this.showChartData(res);
        break;
      default :
        break;
    }
  }

  showChartData(res){
    this.candidateHelpedCount = res.data.advicePoints ? res.data.advicePoints / 100 : 0;
    this.candidateThanksCount = res.data.adviceLikedPoints ? res.data.adviceLikedPoints / 50 : 0;
    this.candidateCommentsCount = res.data.ReplyAdvicePoints ? res.data.ReplyAdvicePoints / 25 : 0;

    this.daughnutChartDataConfig.datasets[0].data[0] = res.data.ratingPoints;

    let firstNum = 0;
    let secondNum = 999;
    
    while(true){
      if(res.data.ratingPoints >= firstNum && res.data.ratingPoints <= secondNum){
        this.daughnutChartDataConfig.datasets[0].data[1] = secondNum - res.data.ratingPoints;
        // this.targetText = (secondNum - res.data.ratingPoints) + '';
        this.targetText = (secondNum + 1) + '';
        break;
      }else{
        firstNum = secondNum;
        secondNum += 1000;
      }
    }

    this.totalText = res.data.ratingPoints + '';
    
    this.changeText();
    this.DaughnutChart.update();

  }

  changeText(){
    let THIS = this;
    Chart.pluginService.register({
      beforeDraw: function(chart) {
        if(chart.options.centerText){
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
      
          ctx.fillStyle = 'blue';

          ctx.textColor = 'red';
          ctx.fillText(text, textX, textY);
          ctx.fillText(THIS.totalScore, textX - 30, textY + 30);

          ctx.fillStyle = 'red';
          ctx.textColor = 'gray';
          var text2 = THIS.targetText;
          ctx.fillText(text2, textX, textY + 85);
          ctx.fillText(THIS.targetScore, textX - 35, textY + 115);

          ctx.save();
        }
      }
    });
  }

  handleLineChartClick() {
    this.chartObj = this;
  }

  showDaughnutChartData() {
    this.DaughnutChart = new Chart("doughnutChart", {
      type: "doughnut",
      data: this.daughnutChartDataConfig,
      options: this.chartOptions
    });
  }

  ngOnDestroy(){
    this.totalText = '';
    this.targetText = '';
    this.totalScore = '';
    this.targetScore = '';
    this.changeText();
  }

}
