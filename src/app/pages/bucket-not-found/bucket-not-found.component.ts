import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bucket-not-found',
  templateUrl: './bucket-not-found.component.html',
  styleUrls: ['./bucket-not-found.component.css']
})
export class BucketNotFoundComponent {

  constructor(
    private router: Router,
  ) 
  { }

  backHome(): void {
    this.router.navigateByUrl('');
  }

}
