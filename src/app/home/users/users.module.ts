import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatLegacyButtonModule as MatButtonModule } from 
    '@angular/material/legacy-button';
import { MatButtonToggleModule } from 
    '@angular/material/button-toggle';
import { MatDatepickerModule } from 
    '@angular/material/datepicker';
import { MatLegacyInputModule as MatInputModule } from 
    '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from 
    '@angular/material/legacy-form-field';
import { MatNativeDateModule } from 
    '@angular/material/core';
import { MatLegacyOptionModule as MatOptionModule } from 
    '@angular/material/legacy-core';
import { UserComponent } from './user/user.component';

import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class UsersModule { }
