import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Bucket } from '../models/bucket-model';
import { BUCKETS } from '../models/bucket-mock';
import { BucketResponse } from '../models/bucket-response';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  //jsonFile = 'assets/json/buckets.json';
  jsonFile = 'http://localhost:3000/buckets';
  //headers = { 'Content-Type': 'application/json' };
  
  //bucketList!: Bucket[];
  bucketSorted!: Bucket[]; 
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public getBuckets(): Observable<Bucket[]> {
    const url = `${this.jsonFile}`;
    console.log('GET url=', url);
    return this.httpClient.get<Bucket[]>(this.jsonFile);
  }

  public getBucketById(idBucket: number): Observable<Bucket[]> {
    const url = `${this.jsonFile}/${idBucket}`;
    console.log('GET/id url=', url);
    return this.httpClient.get<Bucket[]>(this.jsonFile,{responseType: 'json'});
  }

  public addBucket(bucket: Bucket): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}`;
    console.log('POST url=', url);
    this.httpClient.post<Bucket>(url, bucket, { headers }).subscribe();
  }

  updBuckets(bucket: Bucket, bucketNew: Bucket): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}/${bucket.Id}`;
    console.log('PUT url=', url);
    this.httpClient.put<Bucket>(url,bucketNew, { headers }).subscribe();
  }

  delBucketById(idBucket: number): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}/${idBucket}`;
    console.log('DEL url=', url);
    this.httpClient.delete<Bucket>(url, { headers }).subscribe();
  }

  getBucketsMaxId(): number {
    //let bucketSorted = BUCKETS;
    let bucketSorted1 = 
    this.httpClient.get<Bucket[]>(this.jsonFile).subscribe();
    //.subscribe(buckets => this.bucketSorted = buckets
    //  .sort((x,y) => x.Id < y.Id ? -1 : 1)
    //);
    //const sorted = bucketSorted.sort((a,b) => b.Id - a.Id);
    //console.log('this.bucketSorted[0].Id', this.bucketSorted);
    //return 1;//Number(this.bucketSorted[0].Id) + 1;

    let buckets = this.httpClient.get<Bucket[]>(this.jsonFile,{responseType: 'json'}).subscribe();

    console.log('this.bucketSorted[0].Id', buckets);

    return 1;
  }

}
