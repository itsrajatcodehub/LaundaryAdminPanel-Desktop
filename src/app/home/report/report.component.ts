import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor() { }
  reports: any[] = [
    {
      icon:'analytics',
      title:'Order Report',
      description:'Daily Orders Report Bill Wise',
      link:'order-report'
    },
    {
      icon:'monitoring',
      title:'Customer Wise Report',
      description:'Daily Orders Report Customer Wise',
      link:'customer-report'
    },
  ]
  ngOnInit(): void {
  }

}
