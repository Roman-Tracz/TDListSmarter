import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bucket-has-been-deleted',
  templateUrl: './bucket-has-been-deleted.component.html',
  styleUrls: ['./bucket-has-been-deleted.component.css']
})
export class BucketHasBeenDeletedComponent {

  constructor(
    private router: Router,
  ) { }

  backHome(): void {
    this.router.navigateByUrl('');
  }

}
