import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickupRoutingModule } from './pickup-routing.module';
import { PickupComponent } from './pickup.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';

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
import { ComponentsModule } from 'src/app/components/components.module';
import {DialogModule} from '@angular/cdk/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

    @NgModule({
  declarations: [
    PickupComponent
  ],
  imports: [
    CommonModule,
    PickupRoutingModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ComponentsModule,
    DialogModule,
    MatDialogModule,
    MatIconModule,
  ]
})
export class PickupModule { }
