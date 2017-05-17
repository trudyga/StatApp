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
import { SampleComponent } from './content/sample/sample.component';
import { GistogramComponent } from './content/graphs/gistogram/gistogram.component';
import { XlsxFileUploadComponent } from './content/sample/xlsx-file-upload/xlsx-file-upload.component';
import { BubbleComponent } from './content/graphs/bubble/bubble.component';
import { SecondaryAnalysisResultComponent } from './content/analysis-result/secondary-analysis-result/secondary-analysis-result.component';

import { AnalysisHTTPService } from './services/http/analysis-service.service';
import { SampleService } from './services/sample.service';
import { PrimaryAnalysisResultService } from './services/primary-analysis.service';
import { GraphsService } from './services/graphs.service';
import { SecondaryAnalysisResultService } from './services/secondary-analysis.service';


const apiUrl = "http://localhost:8080/api/";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    DescriptionComponent,
    AnalysisResultComponent,
    GraphsComponent,
    SampleComponent,
    GistogramComponent,
    XlsxFileUploadComponent,
    BubbleComponent,
    SecondaryAnalysisResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
  {provide: AnalysisHTTPService, useClass: AnalysisHTTPService },
  {provide: SampleService, useClass: SampleService },
  {provide: PrimaryAnalysisResultService, useClass: PrimaryAnalysisResultService},
  {provide: GraphsService, useClass: GraphsService},
  {provide: SecondaryAnalysisResultService, useClass: SecondaryAnalysisResultService},
  {provide: "API_URL", useValue: apiUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
