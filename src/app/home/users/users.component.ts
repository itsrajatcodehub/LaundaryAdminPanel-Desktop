import { Component, OnInit, ViewChild } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';
import { UserData } from 'src/app/structures/user.structure';
declare const UIkit: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  @ViewChild('paginator') paginator: any;

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    photoURL: new FormControl(''),
    pinCode: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    altPhone: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    countryName: new FormControl('--select--', [Validators.required]),
    landMark: new FormControl('', [Validators.required]),
    cityName: new FormControl('--select--', [Validators.required]),
    stateName: new FormControl('--select--', [Validators.required]),
   
  });
  alertService: any;
  constructor(private databaseService:DatabaseService,private alert:AlertsAndNotificationsService,private dataProvider:DataProvider) { }
  editUser: boolean = false;
  totalUsers!: number;
  users!: any[];
  filteredUsers: any[] = [];
  pageSize: number = 30;
  deleteUserModal: boolean = false;
  
  ngOnInit(): void{
  
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.getFirstUsers(this.pageSize,'user').then((docs) => {
      this.users = [];
      docs.forEach((doc) => {
        this.users.push({ id: doc.id, ...doc.data() });
      });
      this.dataProvider.pageSetting.blur = false;
      this.filteredUsers = this.users;
      console.log(this.filteredUsers);
    });
  }

  editUserDetails(){
    this.editUser = true;
    UIkit.modal(document.getElementById('newUser')).show();
  }
  addNewUserDetails(){
    this.editUser = false;
    UIkit.modal(document.getElementById('newUser')).show();
  }
  deleteUserDetails(){
    this.deleteUserModal = !this.deleteUserModal;
  }
  viewUser(id:string){
   

  }
  validatePhotos(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      var fileIsValid = false;
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        this.alertService.presentToast(
          'Only png, jpeg and jpg images are allowed',
          'error'
        );
      } else if (file.size >= 1_000_000) {
        this.alertService.presentToast(
          "Each image's size must be less than 1 MB",
          'error'
        );
      } else {
        fileIsValid = true;
      }
      if (!fileIsValid) {
        target.value = '';
        return;
      }
    }
  }
  async submit() {
    console.log(this.userForm.value);
  }
  getUsers(event: PageEvent) {
    var currIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const startIndex = currIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredUsers = this.users;
  }

}
