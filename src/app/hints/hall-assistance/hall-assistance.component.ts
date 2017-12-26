import { Component, OnInit } from '@angular/core';
import { HallAssistanceService } from './hall-assistance.service';

@Component({
  selector: 'app-hall-assistance',
  templateUrl: './hall-assistance.component.html',
  styleUrls: ['./hall-assistance.component.css']
})
export class HallAssistanceComponent implements OnInit {

  constructor(
    private hallService: HallAssistanceService
  ) {
   }

  ngOnInit() {
  }

  getDataSet(): any {
    return this.hallService.dataSet;
  }

  getBackgroundImage(data: any ): string {
    return `linear-gradient(to bottom, ${data.color} 0%, ${data.color} 50%, #292929 100%)`;
  }

  getBoxShadow(data: any): string {
    return `0px 0px 5px 1px ${data.color}, 0px 0px 3px 1px white`;
  }
}
