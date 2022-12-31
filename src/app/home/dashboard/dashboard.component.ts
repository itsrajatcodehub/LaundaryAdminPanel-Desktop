import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
    Chart.register(...registerables);
  }
   labels =['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  ngOnInit(): void {
    const lineChart = document.getElementById(
      'line'
    ) as HTMLCanvasElement;
    if (lineChart) {
      const Charts = new Chart(lineChart, {
        type: 'line',
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',

          ],
          datasets: [
            {
              label: '',
              data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
              borderColor: '#E88F9F',
              tension: 0.2,
            },

          ],
        },
        options: {
          
          maintainAspectRatio: false,
          plugins:{
            legend: {
             display: false
            }
           },
          scales: {
               x: {
                  grid: {
                     display: false
                  }
               },
               y: {
                  grid: {
                     display: false
                  }
               }
          }
       }  
      });
    }
    const barChart = document.getElementById(
      'barChart'
    ) as HTMLCanvasElement;
    if (barChart) {
      const Charts = new Chart(barChart,
        {
          type: 'bar',
          data: {
            datasets: [{
              label: 'My First Dataset',
              data: [100,299,400],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          },
        }
        )
    }
  }

}
