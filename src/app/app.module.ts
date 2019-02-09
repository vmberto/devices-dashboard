import { ToastModule } from './components/generic-components/toast/toast.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2OdometerModule } from 'ng2-odometer';

import { TokenInterceptor, AuthGuardService } from './services';

import { WordWrapPipe } from './pipes/word-wrap.pipe';

// Components
import {
  AppComponent,
  SidebarComponent,
  RootComponent,
  LoginComponent,
  DashboardComponent,
  ClientsListComponent,
  ClientsCreateComponent,
  ClientsShowComponent,
  DataCardComponent,
  ClientDataComponent,
  ClientsIndexComponent,
  ClientMessagesComponent,
  ClientEnvironmentsComponent,
  RegisterComponent,
  StartIndexComponent,
  DevicesListComponent,
  DevicesIndexComponent
} from './components';

// Directives
import { ModalDirective } from './directives/modal.directive';
import { ChangeColorDirective } from './directives/background-color.directive';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RootComponent,
    LoginComponent,
    DashboardComponent,
    ClientsListComponent,
    WordWrapPipe,
    ClientsCreateComponent,
    ClientsShowComponent,
    DataCardComponent,
    ClientDataComponent,
    ClientsIndexComponent,
    ModalDirective,
    ChangeColorDirective,
    ClientMessagesComponent,
    ClientEnvironmentsComponent,
    RegisterComponent,
    StartIndexComponent,
    DevicesListComponent,
    DevicesIndexComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2OdometerModule.forRoot(),
    ToastModule.forRoot(),
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pt'}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
