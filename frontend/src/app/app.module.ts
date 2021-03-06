import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { HelloWorldTemplateComponent } from './hello-world-template.component';
import { HelloWorldNgIfComponent } from './hello-world-ngif/hello-world-ngif.component';
import { HelloWorldDependencyInjectionComponent } from './hello-world-di/hello-world-di.component';
import { HelloWorldInterpolationComponent } from './hello-world-interpolation/hello-world-interpolation.component';
import { HelloWorldBindingsComponent } from './hello-world-bindings/hello-world-bindings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { FileUploderComponent } from './file-uploder/file-uploder.component';


@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    HelloWorldTemplateComponent,
    HelloWorldNgIfComponent,
    HelloWorldDependencyInjectionComponent,
    HelloWorldInterpolationComponent,
    HelloWorldBindingsComponent,
    FileUploderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
