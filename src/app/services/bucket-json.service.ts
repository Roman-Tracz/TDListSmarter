import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Bucket } from '../models/bucket-model';


@Injectable({
  providedIn: 'root'
})
export class BucketService {

  //!!jsonFile = 'assets/json/buckets.json';
  jsonFile = 'http://localhost:3000/buckets';
  
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

  getBucketsNextId(): Observable<number> {
    return this.httpClient.get<Bucket[]>(this.jsonFile)
    .pipe( map( 
      (buckets: Bucket[]) => { 
        const sortedBuckets = buckets.sort((x,y) => x.Id > y.Id ? -1 : 1);
        console.log('',sortedBuckets);
        return Number(sortedBuckets[0].Id) + 1;
      }
    ));
  }



}
