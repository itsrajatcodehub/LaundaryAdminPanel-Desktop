import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { UserData } from 'src/app/structures/user.structure';

declare const UIkit: any;
@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {
  @Input() userType = '';

  userToEdit: any;
  agentForm: UntypedFormGroup = new UntypedFormGroup({
    firstName: new UntypedFormControl('', [Validators.required]),
    lastName: new UntypedFormControl('', [Validators.required]),
    photoURL: new UntypedFormControl(''),
    phoneNumber: new UntypedFormControl('',[Validators.required, Validators.pattern('[0-9]{10}')]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    countryName: new UntypedFormControl('', [Validators.required]),
    cityName: new UntypedFormControl(''),
    stateName: new UntypedFormControl(''),
    dob: new UntypedFormControl(''),
    address: new UntypedFormControl(''),
  });
  constructor(   private dataProvider: DataProvider,
    private alertService: AlertsAndNotificationsService,
    private databaseService: DatabaseService,
    private router: Router,
    private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.userType = window.location.pathname.split('/')[3];
    console.log(this.userType);
    
  }
  addUsers() {
  console.log(this.agentForm.value);
  }

  resetSubscriptionModal() {
    this.agentForm.reset();
    this.userToEdit = null;
  }

  // async searchUsers(event: Event) {
  //   if (!this.allUsers) {
  //     this.dataProvider.pageSetting.blur = true;
  //     await this.databaseService.getAllUsers().then((docs) => {
  //       this.allUsers = [];
  //       docs.forEach((doc) => {
  //         this.allUsers.push({ id: doc.id, ...doc.data() } as UserData);
  //       });
  //     });
  //     this.dataProvider.pageSetting.blur = false;
  //   }

  //   const query = (event.target as HTMLInputElement)?.value.trim();
  //   if (query.length > 0) {
  //     const options = { keys: ['name', 'phone'] };
  //     const fuse = new Fuse(this.allUsers, options);
  //     const results = fuse.search(query);
  //     this.filteredUsers = [];
  //     results.forEach((result: any) => {
  //       this.filteredUsers.push(result.item);
  //     });
  //   } else {
  //     this.filteredUsers = this.users;
  //   }
  // }
 
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
    if (this.agentForm.valid) {
      this.dataProvider.pageSetting.blur = true;
   
      const userPhoto = document.getElementById(
        'user-photo'
      ) as HTMLInputElement;
      if (userPhoto && userPhoto.files && userPhoto.files.length > 0) {
        await this.databaseService
          .upload('users/' + new Date().getTime(), userPhoto.files[0])
          .then((url) => {
            this.agentForm.get('photoURL')!.setValue(url);
          });
      } else {
        this.agentForm.value.photoURL = this.agentForm.value.photoURL;
      }

      const dob = new Date(this.agentForm.get('dob')?.value);
      const user = {
        photoURL: this.agentForm.get('photoURL')?.value,
        address: this.agentForm.get('address')?.value,
        stateName: this.agentForm.get('stateName')?.value,
        cityName: this.agentForm.get('cityName')?.value,
        countryName: this.agentForm.get('countryName')?.value,
        totalOrders: 0,
        phone: this.agentForm.get('phoneNumber')?.value,
        email: this.agentForm.get('email')?.value,
        name: this.agentForm.get('firstName')?.value + ' ' + this.agentForm.get('lastName')?.value,
        access: 'agent',
        emailVerified: false,
        dob: Timestamp.fromDate(dob),
        created: Timestamp.now(),
      } as UserData;
      if (this.userToEdit) {
        await this.databaseService.editUser(this.userToEdit.id, user);
      } else {
        await this.databaseService.addUser(user);
      }
      this.dataProvider.pageSetting.blur = false;
      if (this.userToEdit) {
        this.alertService.presentToast('User edited successfully');
      } else {
        this.alertService.presentToast('User added successfully');
      }
      this.ngOnInit();
    } else {
      this.alertService.presentToast(
        'Please enter all the required fields correctly',
        'error'
      );
    }
  }


}
