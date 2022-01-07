// import { HttpClient, HttpEventType } from '@angular/common/http';
// import { Subscription,finalize } from 'rxjs';

import { Component, Input, OnInit } from '@angular/core';

import {HttpClient, HttpRequest, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-file-uploder',
  templateUrl: './file-uploder.component.html',
  styleUrls: ['./file-uploder.component.css']
})
export class FileUploderComponent /*implements OnInit */ {

  selectedFiles!: FileList;
	currentFile!: File | null;
  msg!: any;

  constructor(private http: HttpClient) {}
	
  selectFile(event: any) {

    console.log("selectFile event", event);
    this.selectedFiles = event.target.files;
  }
  
  upload() {

    console.log("this.currentFile: ",this.currentFile);
    

      this.currentFile = this.selectedFiles.item(0);
      if(this.currentFile)
      this.uploadFile(this.currentFile)
              .subscribe(response => {
                    // if(this.selectedFiles)
                    //   this.selectedFiles.value = '';

                    if (response instanceof HttpResponse) {
                        this.msg = response.body;
                        console.log(response.body);
                    }	  
              });  
    
  }
  uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', 'http://localhost:4200/api/files/upload', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
	
		return this.http.request(req);
   }
}

  // @Input()
  // requiredFileType!: string;

  // fileName = '';
  // uploadProgress!: number | null;
  // uploadSub!: Subscription  | null;

  // constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//   }

//   onFileSelected(event: any) {

//     const file:File = event.target.files[0];

//     if (file) {

//         this.fileName = file.name;
//         const formData = new FormData();
//         formData.append("thumbnail", file);

//         const upload$ = this.http.post("/api/thumbnail-upload", formData, {
//           reportProgress: true,
//           observe: 'events'
//       })
//       .pipe(
//           finalize(() => this.reset())
//       );
    
//       this.uploadSub = upload$.subscribe(e => {
//         if (e.type == HttpEventType.UploadProgress) {
//           this.uploadProgress = Math.round(100 * (e.loaded / event.total));
//         }
//       })
//     }
//  }

//   cancelUpload() {
//     this.uploadSub?.unsubscribe();
//     this.reset();
//   }

//   reset() {
//     this.uploadProgress = null;
//     this.uploadSub = null;
//   }
// }
