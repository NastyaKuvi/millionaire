import { Component, OnInit, HostListener } from '@angular/core';
import { StartGameService } from './start-game.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {

  constructor(
    private startService: StartGameService
  ) { }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    console.log(event.key);
    switch(event.key) {
      case "1":
      case "2":
      case "3":
      case "4": {
        console.log("i'm in a start game page");
        this.startService.startGame(event.key);
        break;
      }
    }
  }
}
