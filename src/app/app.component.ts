import { Component } from '@angular/core';

import { DataProvider } from './providers/data.provider';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'urbanLaundryDesktop';
  constructor(public dataProvider:DataProvider){
  }
  ngOnInit(): void{
    if (window.location.hostname){
      this.dataProvider.electron = true;
    }
  }
}
