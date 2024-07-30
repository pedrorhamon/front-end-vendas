import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data: any;
  options: any;

  constructor() {
    this.data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: '#42A5F5'
        }
      ]
    };

    this.options = {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    };
  }
}
