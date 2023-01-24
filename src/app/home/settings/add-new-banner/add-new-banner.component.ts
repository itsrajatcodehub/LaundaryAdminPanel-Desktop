import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-new-banner',
  templateUrl: './add-new-banner.component.html',
  styleUrls: ['./add-new-banner.component.scss']
})
export class AddNewBannerComponent {
  types:string[] = ['Url','App']
  appLinks:AppLink[] = []
  newBannerForm = new FormGroup({
    title: new FormControl(''),
    bannerUrlType: new FormControl('url'),
    bannerUrl: new FormControl(''),
    bannerImage: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    enabled: new FormControl(true),
  })
}

interface AppLink {
  title:string,
  url:string
}