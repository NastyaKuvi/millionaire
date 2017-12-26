import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TimerComponent } from './hints/timer/timer.component';
import { TimerService } from './hints/timer/timer.service';
import { HallAssistanceComponent } from './hints/hall-assistance/hall-assistance.component';
import { HallAssistanceService } from './hints/hall-assistance/hall-assistance.service';


@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    HallAssistanceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TimerService,
    TimerComponent,
    HallAssistanceComponent,
    HallAssistanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
