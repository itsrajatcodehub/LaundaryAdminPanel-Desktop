import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickupRoutingModule } from './pickup-routing.module';
import { PickupComponent } from './pickup.component';


@NgModule({
  declarations: [
    PickupComponent
  ],
  imports: [
    CommonModule,
    PickupRoutingModule
  ]
})
export class PickupModule { }
