import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { AddNewBannerComponent } from './add-new-banner/add-new-banner.component';
import { AddNewClothComponent } from './add-new-cloth/add-new-cloth.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  banners:Banner[] = [
    {
      id: '1',
      enabled: true,
      title: 'Banner 1',
      bannerUrlType: 'url',
      bannerUrl: 'https://www.google.com',
      bannerImage: 'https://picsum.photos/300/100',
      startDate: Timestamp.fromDate(new Date()),
      endDate: Timestamp.fromDate(new Date())
    }
  ]
  holidays:Date[] = []

  reasons: Reason[] = [
    {
      id: '1',
      title: 'Reason 1'
    },
    {
      id: '1',
      title: 'Reason 1'
    },
    {
      id: '1',
      title: 'Reason 1'
    },
  ]
  time:Date[] = []

  clothes:{title:string;id?:string}[] = []

  services:Service[] = [
    {
      id: '1',
      title: 'Service 1',
      image: 'https://picsum.photos/300/100',
      enabled: true,
      clothes: [
        {
          id: '1',
          title: 'Cloth 1',
          icon: 'https://picsum.photos/300/100',
          cost: 100,
          mode:'read'
        },
      ]
    },
  ]
  days:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  icons:any[] = []
  slots:any[] = []
  privacyPolicy:string = ''
  termsAndConditions:string = ''
  areas:{title:string;id?:string}[] = []
  contactForm:FormGroup = new FormGroup({
    phone: new FormControl(''),
    whatsapp: new FormControl(''),
  })
  constructor(private dialog:Dialog) { }

  ngOnInit(): void {
    // get this file in json from https://fonts.google.com/metadata/icons
    
    fetch('./assets/icons.json').then(res => res.json()).then(data => {
      this.icons = data.icons.splice(0, 500)
      console.log(this.icons);
    })
    // generate sequential time for 24 hours
    let time = new Date()
    time.setHours(0,0,0,0)
    for(let i = 0; i < 24; i++){
      this.time.push(new Date(time))
      time.setHours(time.getHours() + 1)
    }
  }

  saveServices(){}

  addClothesToService(service:Service){
    let cloth:Cloth = {
      title: '',
      icon: '',
      cost: 0,
      mode:'add'
    }
    service.clothes.push(cloth)
  }
  
  dateToTimeStamp(date:Date){
    
  }

  addNewSlot(){
    this.slots.push({startTime:'',endTime:'',day:''})
  }

  addNewBanner(){
    const dialog = this.dialog.open(AddNewBannerComponent)
  }

  addClothes(){
    const addClothDialog = this.dialog.open(AddNewClothComponent,{data:'Add New Cloth'})
    addClothDialog.closed.subscribe((cloth:any) => {
      console.log(cloth);
      if(cloth.name){
        this.clothes.push({title:cloth.name})
      }
    })
  }

  addAreas(){
    const addAreaDialog = this.dialog.open(AddNewClothComponent,{data:'Add New Area'})
    addAreaDialog.closed.subscribe((area:any) => {
      console.log(area);
      if(area.name){
        this.areas.push({title:area.name})
      }
    })
  }

  addNewService(){
    const addAreaDialog = this.dialog.open(AddNewClothComponent,{data:'Add New Service'})
    addAreaDialog.closed.subscribe((area:any) => {
      console.log(area);
      if(area.name){
        let service:Service = {
          clothes: [],
          enabled: true,
          image: '',
          title: area.name,
        }
        this.services.push(service)
      }
    })
  }

  addHoliday(event:any){
    this.holidays.push(event.value)
  }

  deleteReason(is:string){
    this.reasons = this.reasons.filter(reason => reason.id !== is)
  }
  deleteCloth(id:string){
    this.clothes = this.clothes.filter(cloth => cloth.id !== id)
  }
  deleteArea(id:string){
    this.areas = this.areas.filter(area => area.id !== id)
  }

  deleteHoliday(date:Date){
    this.holidays = this.holidays.filter(holiday => holiday !== date)
  }

  // dateFilter
  myFilter = (d: Date | null): boolean => {
    // Prevent duplicates from holidays
    return !this.holidays.some(holiday => holiday.getTime() === d?.getTime());
  };

}

interface Banner {
  id?: string;
  enabled: boolean;
  title: string;
  bannerUrlType:'url'|'inApp';
  bannerUrl: string;
  bannerImage: string;
  startDate?: any;
  endDate?: any;
}
interface Reason {
  id?: string;
  title: string;
}
interface Service {
  id?: string;
  title: string;
  image: string;
  clothes:Cloth[];
  enabled: boolean;
}
interface Cloth {
  id?: string;
  title: string;
  icon: string;
  cost: number;
  mode:'add'|'edit' | 'read';
  form?:FormGroup;
}
interface Icon {
  title: string;
  icon: string;
}