import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditAmountComponent } from './Components/credit-amount/credit-amount.component';
import { LogInScreenComponent } from './Components/log-in-screen/log-in-screen.component';
import { MainViewComponent } from './Components/main-view/main-view.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { AppLayoutComponent } from './Components/layout/app-layout/app-layout.component';
import { LoginLayoutComponent } from './Components/layout/login-layout/login-layout.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full' },
  {path:'', component:AppLayoutComponent, children: [
    {path: 'main', component: MainViewComponent, title:'Money Expenditure Tracker'},
    {path: 'creditAmount', component:CreditAmountComponent, title:'Crédito Restante'},

  ]},
  {path:'', component: LoginLayoutComponent, children:[
    {path:'login', component: LogInScreenComponent, title:'Login to App'},

  ]},
  {path:'**', component: PageNotFoundComponent, title:'404'},
]

@NgModule({
  declarations: [],
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
