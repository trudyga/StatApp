import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { DescriptionComponent } from './content/description/description.component';
import { AnalysisResultComponent } from './content/analysis-result/analysis-result.component';
import { GraphsComponent } from './content/graphs/graphs.component';

import { AnalysisService } from './services/http/analysis-service.service';

const apiUrl = "http://localhost:8080/api/";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    DescriptionComponent,
    AnalysisResultComponent,
    GraphsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
  {provide: AnalysisService, useClass: AnalysisService },
  {provide: "API_URL", useValue: apiUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
