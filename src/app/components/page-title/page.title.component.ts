import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './page.title.component.html',
  styleUrls: ['./page.title.component.css']
})
export class TitleComponent implements OnInit {

  @Input() pageTitle = "";

  constructor() { }

  ngOnInit(): void {

  }

}
