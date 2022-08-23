//import { HttpClient } from '@angular/common/http';
//import {  HttpClientModule } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import { BucketResponse } from '../models/bucket-response';
//import { Bucket } from '../models/bucket-model';
import { Injectable } from '@angular/core';
//import * as Js from 'src/assets/json/buckets.json'

@Injectable()

export class BucketJsonService {

  constructor(

    //private httpClient: HttpClientModule

  ) { 
    
    //this.getCategories().subscribe(data => {
    //  console.log(data);
    //});

  }

  //public getCategories(): Observable<BucketResponse> {
  //  return this.httpClient.get<BucketResponse>('src/assets/json/buckets.json',{responseType: 'json'});
  //}

  //public getCategories(): Observable<BucketResponse> {
  //  return this.httpClient.get<BucketResponse>('src/assets/json/buckets.json');
  //}

  //public getCategories(): Observable<Bucket[]> {
  //  return this.httpClient.get<Bucket[]>('src/assets/json/buckets.json',{responseType: 'json'});
  //}

  //public getCategories(): Observable<any> {
    //!!return this.httpClient.get('src/assets/json/buckets.json');
    //return this.httpClient.get('src/assets/json/buckets.json');
  //}

}
