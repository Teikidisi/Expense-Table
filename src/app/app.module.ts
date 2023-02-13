import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CantidadValidaDirective } from './cantidad-valida.directive';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { LogInScreenComponent } from './log-in-screen/log-in-screen.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    MainViewComponent,
    CantidadValidaDirective,
    LogInScreenComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
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
