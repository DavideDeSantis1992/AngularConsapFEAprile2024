import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componenti/login/login.component';
// import { AppComponent } from './app.component';
import { HomeComponent } from './componenti/home/home.component';
import { HomeaccessoComponent } from './componenti/homeaccesso/homeaccesso.component';
import { ElencoComponent } from './componenti/elenco/elenco.component';
import { InserimentoComponent } from './componenti/inserimento/inserimento.component';
import { IspezionaComponent } from './componenti/ispeziona/ispeziona.component';
import { ModificaComponent } from './componenti/modifica/modifica.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  {
    path: 'homeaccesso',
    component: HomeaccessoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inserimento',
    component: InserimentoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'elenco', component: ElencoComponent, canActivate: [AuthGuard] },
  {
    path: 'ispeziona',
    component: IspezionaComponent,
    canActivate: [AuthGuard],
  },
  { path: 'modifica', component: ModificaComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
