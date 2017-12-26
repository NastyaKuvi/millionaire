import { Injectable } from '@angular/core';

@Injectable()
export class HallAssistanceService {

  dataSet : Array<{ answer: string, color: string}>;

  constructor() {
    this.dataSet = [{answer: "A", color: "#da0000"},
                    {answer: "B", color: "#07ce00"},
                    {answer: "C", color: "#1cafb9"},
                    {answer: "D", color: "#ff5e01"}]
   }

  getDataSet() : any {
    return this.dataSet;
  }
}
