import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bucket-not-found',
  templateUrl: './bucket-not-found.component.html',
  styleUrls: ['./bucket-not-found.component.css']
})
export class BucketNotFoundComponent implements OnInit {

  constructor(
    private router: Router,
  ) 
  { }

  ngOnInit(): void {
  }

  backHome(): void {
    this.router.navigateByUrl('');
  }

}
