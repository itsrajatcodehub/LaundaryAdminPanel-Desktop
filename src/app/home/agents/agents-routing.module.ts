import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './agent/agent.component';
import { AgentsComponent } from './agents.component';

const routes: Routes = [{
  path: '',
  component: AgentsComponent,
},
{
  path: ':id',
  component: AgentComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }
