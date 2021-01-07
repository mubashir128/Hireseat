import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";

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

  constructor() {
    this.data = {
      labels: this.chartColor,
      datasets: [{
          label : "",
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

  centerTextIs = "75%";

  ngOnInit() {
    this.renderBarChartData();
    this.changeText();
    // setTimeout(()=>{
    //   this.centerTextIs = "100%";
    //   this.changeText();
    //   this.BarChart.update();
    // },5000);

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
          var fontSize = (height / 170).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
      
          var text = THIS.centerTextIs,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
      
          ctx.fillText(text, textX, textY);

          ctx.fillText("Total Score", textX - 35, textY + 30);

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
