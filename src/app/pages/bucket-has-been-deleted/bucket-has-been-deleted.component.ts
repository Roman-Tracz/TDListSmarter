import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bucket-has-been-deleted',
  templateUrl: './bucket-has-been-deleted.component.html',
  styleUrls: ['./bucket-has-been-deleted.component.css']
})
export class BucketHasBeenDeletedComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  backHome(): void {
    this.router.navigateByUrl('');
  }

}
