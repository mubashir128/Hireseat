import { Component, OnInit, Input } from "@angular/core";
import { Chart } from "chart.js";
import { ChartService } from "src/app/_services/chart.service";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
  topRecruiters = [];
  BarChart;
  barChartData = {};
  chartOptions: any;
  data: any;
  chartObj : any;
  labels = [];
  ratingPoints = [];
  selectedCount = [];
  @Input() recruiterData;

  constructor(private _chart : ChartService) {

    this.data = {
      labels: [],
      datasets: [
        {
          label: "Fee",
          //new option, type will default to bar as that what is used to create the scale
          type: "line",
          yAxisID: "rest",
          lineTension: "0",
          borderColor: "red",
          borderWidth: 3,
          fill: false,
          data: [25, 20, 20, 18, 20]
        },
        {
          //new option, type will default to bar as that what is used to create the scale
          type: "bar",
          label: "Score",
          backgroundColor: "#00b0f0",
          borderColor: "#00b0f0",
          borderWidth: 1,
          data: []
        }
      ]
    };
    
    this.chartOptions = {
      onClick : this.handleLineChartClick,
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
              callback: function(value, index, values) {
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

  ngOnInit() {

    this._chart.topRecruitersRatingPoints().subscribe(async(res)=>{
      this.topRecruiters=res.result;
      await this.updateData(res);
      await this.handleData(res.result,res.data);
      this.data.labels=this.labels;
      this.data.datasets[1].data=this.ratingPoints;
      this.data.datasets[0].data=this.selectedCount;
      this.BarChart = new Chart("barChart", {
        type: "bar",
        data: this.data,
        options: this.chartOptions
      });
    });

  }

  async updateData(res){
    await res.result.map(item=>{
      this.labels.push(item.fullName);
      this.ratingPoints.push(item.ratingPoints);
    });
  }

  async handleData(result,data){
    await result.map(item=>{
      let count=0;
      let sum=0;
      for(let i=0;i<data.length;i++){
        if(item._id === data[i].recruiterKey && data[i].hired){
          count++;
          sum+=data[i].RecruiterCost;
        }
        if(i === data.length-1){
          Number.isNaN(sum/count) ? this.selectedCount.push(0) : this.selectedCount.push(sum/count);
        }
      }
    });
  }

  handleLineChartClick(){
    this.chartObj=this;
  }

}