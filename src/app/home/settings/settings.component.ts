import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  banners:Banner[] = []
  constructor() { }

  ngOnInit(): void {
  }

}

interface Banner {
  id: string;
  enabled: boolean;
  title: string;
  bannerUrlType:'url'|'inApp';
  bannerUrl: string;
  bannerImage: string;
  startDate: Date;
  endDate: Date;
}