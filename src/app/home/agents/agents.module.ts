import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsComponent } from './agents.component';
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

import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
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
