import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInScreenComponent } from './log-in-screen/log-in-screen.component';
import { MainViewComponent } from './main-view/main-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path: 'main', component: MainViewComponent, title:'Money Expenditure Tracker'},
  {path:'login', component: LogInScreenComponent, title:'Login to App'},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path:'**', component: PageNotFoundComponent},
]

@NgModule({
  declarations: [],
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
