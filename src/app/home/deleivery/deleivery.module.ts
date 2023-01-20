import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleiveryRoutingModule } from './deleivery-routing.module';
import { DeleiveryComponent } from './deleivery.component';


@NgModule({
  declarations: [
    DeleiveryComponent
  ],
  imports: [
    CommonModule,
    DeleiveryRoutingModule
  ]
})
export class DeleiveryModule { }
