import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './page.title.component.html',
  styleUrls: ['./page.title.component.css']
})
export class TitleComponent {

  @Input() pageTitle = "";

}
