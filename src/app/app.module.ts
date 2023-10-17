import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { MainViewComponent } from './Components/main-view/main-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CantidadValidaDirective } from './cantidad-valida.directive';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { LogInScreenComponent } from './Components/log-in-screen/log-in-screen.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatTableModule} from '@angular/material/table';
import { CreditAmountComponent } from './Components/credit-amount/credit-amount.component';
import { LoginLayoutComponent } from './Components/layout/login-layout/login-layout.component';
import { AppLayoutComponent } from './Components/layout/app-layout/app-layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    MainViewComponent,
    CantidadValidaDirective,
    LogInScreenComponent,
    PageNotFoundComponent,
    CreditAmountComponent,
    LoginLayoutComponent,
    AppLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    MatTableModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
