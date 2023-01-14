import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsComponent } from './agents.component';
import { MatButtonModule } from 
    '@angular/material/button';
import { MatButtonToggleModule } from 
    '@angular/material/button-toggle';
import { MatDatepickerModule } from 
    '@angular/material/datepicker';
import { MatInputModule } from 
    '@angular/material/input';
import { MatFormFieldModule } from 
    '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from 
    '@angular/material/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AgentComponent } from './agent/agent.component';

@NgModule({
  declarations: [
    AgentsComponent,
    AgentComponent
  ],
  imports: [
    CommonModule,
    AgentsRoutingModule,
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
export class AgentsModule { }
