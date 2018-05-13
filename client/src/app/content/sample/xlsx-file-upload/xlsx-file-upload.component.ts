import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';

import { SampleService } from '../../../services/sample.service';
import { Sample } from '../../../models/general/sample.model';
import { SamplePair } from '../../../models/general/sample-pair.model';

@Component({
  selector: 'app-xlsx-file-upload',
  templateUrl: './xlsx-file-upload.component.html',
  styleUrls: ['./xlsx-file-upload.component.css']
})
export class XlsxFileUploadComponent implements OnInit {
  private rABS: boolean = true;
  private readedSamplesStream: Subject<Sample[]>;

  constructor(private sampleService: SampleService) {
    this.readedSamplesStream = new Subject<Sample[]>();

    this.readedSamplesStream.subscribe((samples) => 
      sampleService.addSample(samples[0])
    );

    this.readedSamplesStream.subscribe((samples) => {
      if (samples.length >= 2) 
        sampleService.addSamplePair(new SamplePair(samples[0], samples[1], samples[0].name, samples[1].name));
    });
  }

  ngOnInit() {

  }

  private handleDrop(e: any) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    let samples: Sample[];
    var i,f;
    for (i = 0; i != files.length; ++i) {
      f = files[i];
      var reader = new FileReader();
      var name = f.name;
      reader.onload = (e: any) => {
        var data = e.target.result;

        var workbook;
        if(rABS) {
          /* if binary string, read with type 'binary' */
          workbook = XLSX.read(data, {type: 'binary'});
        } else {
          /* if array buffer, convert to base64 */
          var arr = fixdata(data);
          workbook = XLSX.read(btoa(arr), {type: 'base64'});
        }

        /* DO SOMETHING WITH workbook HERE */
        let firstSheetName = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[firstSheetName];
        /* PUSH TO STREAM */
        samples = parseWorkshet(worksheet);
        this.readedSamplesStream.next(samples);
      };
      if(rABS) reader.readAsBinaryString(f);
      else reader.readAsArrayBuffer(f);
    }
  }

  private allowDrop(event) {
    event.preventDefault();
  }

}

/**
 * Parse worksheet data into mass of samples
 * @param  {XLSX.IWorkSheet} worksheet [description]
 * @return {Sample[]}                  [description]
 */
function parseWorkshet(worksheet: XLSX.IWorkSheet): Sample[] {
    let rows = XLSX.utils.sheet_to_json(worksheet);

    // get headers
    let headers: string[] = [];
    for (let header in rows[0]) {
        headers.push(header);
    }

    let samples: Sample[] = new Array<Sample>();

    for (let i = 0; i < headers.length; i++) {
      let numbers: number[] = [];
      for (let j = 0; j < rows.length; j++) {
        let number = rows[j.toString()][headers[i]];
        numbers.push(number);
      }
      samples.push(new Sample(numbers, headers[i]));
    }
     
    console.dir(samples);
    return samples;
  }

/* processing array buffers, only required for readAsArrayBuffer */
function fixdata(data) {
  var o = "", l = 0, w = 10240;
  for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
  o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
  return o;
}

var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
/* set up drag-and-drop event */