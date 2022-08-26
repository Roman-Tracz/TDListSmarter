import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Bucket } from '../models/bucket-model';


@Injectable({
  providedIn: 'root'
})
export class BucketService {

  jsonFile = 'http://localhost:3000/buckets';
  
  bucketSorted!: Bucket[]; 
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public getBuckets(): Observable<Bucket[]> {
    const url = `${this.jsonFile}`;
    return this.httpClient.get<Bucket[]>(this.jsonFile);
  }

  public getBucketById(idBucket: number): Observable<Bucket[]> {
    const url = `${this.jsonFile}/${idBucket}`;
    return this.httpClient.get<Bucket[]>(this.jsonFile,{responseType: 'json'});
  }

  public addBucket(bucket: Bucket): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}`;
    this.httpClient.post<Bucket>(url, bucket, { headers }).subscribe();
  }

  updBuckets(bucket: Bucket, bucketNew: Bucket): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}/${bucket.Id}`;
    this.httpClient.put<Bucket>(url,bucketNew, { headers }).subscribe();
  }

  delBucketById(idBucket: number): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}/${idBucket}`;
    this.httpClient.delete<Bucket>(url, { headers }).subscribe();
  }

  getBucketsNextId(): Observable<number> {
    return this.httpClient.get<Bucket[]>(this.jsonFile)
    .pipe( map( 
      (buckets: Bucket[]) => { 
        const sortedBuckets = buckets.sort((x,y) => x.Id > y.Id ? -1 : 1);
        return Number(sortedBuckets[0].Id) + 1;
      }
    ));
  }



}
