import { Component } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

interface IDegree {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-file-uploder',
  templateUrl: './file-uploder.component.html',
  styleUrls: ['./file-uploder.component.css']
})
export class FileUploderComponent /*implements OnInit */ {
  configUrl: string = "http://localhost:4200/api/degrees/";
  degrees: IDegree[] = [];
  selectedDegree!: IDegree | undefined;
  selectedFiles!: FileList;
	currentFile!: File | null;
  msg: any = "";

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
        });
      });
  }
	
  selectFile(event: any) {

    console.log("selectFile event", event);
    this.selectedFiles = event.target.files;
  }


  upload() {
    this.msg = "";
    console.log("this.currentFile: ",this.currentFile);
    

      this.currentFile = this.selectedFiles.item(0);
      if(this.currentFile)
      this.uploadFile(this.currentFile)
              .subscribe(response => {
                    if (response instanceof HttpResponse) {
                        this.msg = response.body;
                        console.log(response.body);
                    }	  
              });  
    
  }
  uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
    let degree = ""
    console.log("this.selectedDegree",this.selectedDegree);
    
    if(this.selectedDegree){
      degree = this.selectedDegree.toString();
    }
    formdata.append('degree', degree)
		const req = new HttpRequest('POST', 'http://localhost:4200/api/analyze/', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
	
		return this.http.request(req);
   }
}