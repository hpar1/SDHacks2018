import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ResumeSwiperComponent } from './resume-swiper/resume-swiper.component';

import { routingModule } from './app-routing';
import { RecruitingDetailsComponent } from './recruiting-details/recruiting-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ResumeSwiperComponent,
    RecruitingDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }