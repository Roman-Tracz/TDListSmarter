import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-router-outlet',
  templateUrl: './router-outlet.component.html',
  styleUrls: ['./router-outlet.component.css']
})
export class RouterOutletComponent implements OnInit {

  route!: string;
  
  constructor(

    private location: Location,
    private router: Router

  ) { 

    this.router.events.subscribe((val) => {
      if(this.location.path() != ''){
        this.route = this.location.path();
      }
      else{
        this.route = 'Home'
      }
    });

  }

  ngOnInit(): void {
  }

}
