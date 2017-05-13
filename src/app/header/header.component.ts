import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	private photo: string = "https://unsplash.com/photos/G9i_plbfDgk";
  
  constructor() {
   }

  ngOnInit() {
  }

}
