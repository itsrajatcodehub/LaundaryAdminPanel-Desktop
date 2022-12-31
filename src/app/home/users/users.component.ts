import { Component, OnInit } from '@angular/core';
declare const UIkit: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }
  editUser: boolean = false;
  deleteUserModal: boolean = false;
  ngOnInit(): void {
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

}
