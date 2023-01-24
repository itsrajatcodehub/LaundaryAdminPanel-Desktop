import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleiveryRoutingModule } from './deleivery-routing.module';
import { DeleiveryComponent } from './deleivery.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
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
@NgModule({
  declarations: [
    DeleiveryComponent
  ],
  imports: [
    CommonModule,
    DeleiveryRoutingModule,
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
    MatDialogModule
  ]
})
export class DeleiveryModule { }
