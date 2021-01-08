import { Component, OnInit } from '@angular/core';
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
export class RecruiterDoughnutChartComponent implements OnInit {

  chartOptions: any;
  data: any;
  chartObj: any;
  BarChart;
  chartColor = ["#0aafff", "#E0DFDF"];
  public SearchFrm: FormGroup;
  candidateHelpedCount = 10;
  candidateThanksCount = 20;
  candidateCommentsCount = 5;
  loggedInUser: any;
  getDoughnutChartData = "getDoughnutChartData";

  doughnutObserver = new Subject();
  doughnutObserver$ = this.doughnutObserver.asObservable();

  centerTextIs;
  centerTextIs2;

  constructor(private formBuilder: FormBuilder, private _socket: WebsocketService, private userService: UserService) {

    this.loggedInUser = this.userService.getUserData();

    this.SearchFrm = this.formBuilder.group({
      // tags: ["", Validators.required],
    });

    this.data = {
      labels: ["Total score", "Remain score"],
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
        text: "Recruiter Performance VS Cost"
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

  async ngOnInit() {
    this.renderBarChartData();
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

    // setTimeout(()=>{
    //   this.centerTextIs = "100%";
    //   this.changeText();
    //   this.BarChart.update();
    // },5000);

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
    this.candidateHelpedCount = res.data.advicePoints;
    this.candidateThanksCount = res.data.adviceLikedPoints;
    this.candidateCommentsCount = res.data.ReplyAdvicePoints;

    this.data.datasets[0].data[0] = res.data.ratingPoints;

    let firstNum = 0;
    let secondNum = 1000;
    
    while(true){
      if(res.data.ratingPoints >= firstNum && res.data.ratingPoints <= secondNum){
        this.data.datasets[0].data[1] = secondNum - res.data.ratingPoints;
        this.centerTextIs2 = secondNum - res.data.ratingPoints;
        break;
      }else{
        firstNum = secondNum;
        secondNum += 1000;
      }
    }

    this.centerTextIs = res.data.ratingPoints;
    
    this.changeText();
    this.BarChart.update();

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
      
          var text = THIS.centerTextIs;
          let textX = Math.round((width - ctx.measureText(text).width) / 2);
          let textY = height / 2 - 50;
      
          ctx.textColor = 'red';
          ctx.fillText(text, textX, textY);
          ctx.fillText("Total Score", textX - 25, textY + 30);

          ctx.textColor = 'gray';
          var text2 = THIS.centerTextIs2;
          ctx.fillText(text2, textX, textY + 85);
          ctx.fillText("Target Score", textX - 30, textY + 115);

          ctx.save();
        }
      }
    });
  }

  handleLineChartClick() {
    this.chartObj = this;
  }

  renderBarChartData() {
    this.BarChart = new Chart("doughnutChart", {
      type: "doughnut",
      data: this.data,
      options: this.chartOptions
    });
  }
}
