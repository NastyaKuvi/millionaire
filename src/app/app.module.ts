import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TimerComponent } from './hints/timer/timer.component';
import { TimerService } from './hints/timer/timer.service';
import { HallAssistanceComponent } from './hints/hall-assistance/hall-assistance.component';
import { HallAssistanceService } from './hints/hall-assistance/hall-assistance.service';
import { StartGameComponent } from './start-game/start-game.component';
import { StartGameService } from './start-game/start-game.service';
import { AudioService } from './audio.service';


@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    HallAssistanceComponent,
    StartGameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TimerService,
    TimerComponent,
    HallAssistanceComponent,
    HallAssistanceService,
    StartGameComponent,
    StartGameService,
    AudioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
