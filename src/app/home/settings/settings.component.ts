import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
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
  discounts:Discount[] = [
    {
      id: '1',
      title: 'Discount 1',
      enabled: true,
      startDate: Timestamp.fromDate(new Date()),
      endDate: Timestamp.fromDate(new Date()),
      value: 10,
      type: 'percentage',
      max:-1,
      min:-1,
    }
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
  constructor(private dialog:Dialog,private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService) { }

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
      time.setMinutes(time.getMinutes() + 30)
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
    this.slots.push({startTime:'',endTime:''})
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

  deleteSlot(slot:any){
    this.slots = this.slots.filter(s => s !== slot)
  }

  deleteHoliday(date:Date){
    this.holidays = this.holidays.filter(holiday => holiday !== date)
  }

  saveContactSettings(){
    console.log(this.contactForm.value);
    this.databaseService.updateSettings({contact:this.contactForm.value}).then(() => {
      this.alertify.presentToast('Contact Updated')
    }).catch(err => {
      this.alertify.presentToast('Error Updating Contact','error')
    })
  }

  saveReasonSettings(){
    console.log(this.reasons);
    this.databaseService.updateSettings({reasons:this.reasons}).then(() => {
      this.alertify.presentToast('Reasons Updated')
    }).catch(err => {
      this.alertify.presentToast('Error Updating Reasons','error')
    })
  }

  saveSlots(){
    console.log(this.slots);
    this.databaseService.updateSettings({slots:this.slots}).then(() => {
      this.alertify.presentToast('Slots Updated')
    }).catch(err => {
      this.alertify.presentToast('Error Updating Slots','error')
    })
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
interface Discount { 
  id?:string;
  title: string;
  type:'percentage'|'flat';
  value: number;
  min: number;
  max: number;
  startDate: any;
  endDate: any;
  enabled: boolean;
}