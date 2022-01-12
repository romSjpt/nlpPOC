
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

interface IDegree {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'hello-world',
  template: `
    <h2>Analyze CV</h2>
    <mat-form-field appearance="fill">
      <mat-label>Degree Type</mat-label>
      <mat-select>
        <mat-option *ngFor="let degree of degrees" [value]="degree.value">
          {{degree.viewValue}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `
})
export class HelloWorldComponent {
  degrees: IDegree[] = [
    // {value: 'steak-0', viewValue: 'Steak'},
    // {value: 'pizza-1', viewValue: 'Pizza'},
    // {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  configUrl: string = "http://localhost:4200/api/degrees/";


  constructor(private http: HttpClient) {
      
      const degrees = this.http.get<IDegree[]>(this.configUrl);
      // console.log("responce: ",degrees)
      degrees
      .subscribe(sub => {
         console.log("degrees foreach: ",sub);

         sub.forEach(subDegree=>{
        const degree: IDegree = {
          value: subDegree.toString(),
          viewValue: subDegree.toString()
        };
        this.degrees.push(degree);
        // console.log(z)
      });
       

       


    });
  }
}
