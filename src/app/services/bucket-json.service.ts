import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Bucket } from '../models/bucket-model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BucketService {

  jsonFile = environment.bucketsJsonLink;
  
  bucketSorted!: Bucket[]; 
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getBuckets(): Observable<Bucket[]> {
    const url = `${this.jsonFile}`;
    return this.httpClient.get<Bucket[]>(this.jsonFile);
  }

  getBucketById(idBucket: number): Observable<Bucket[]> {
    const url = `${this.jsonFile}/${idBucket}`;
    return this.httpClient.get<Bucket[]>(this.jsonFile,{responseType: 'json'});
  }

  addBucket(bucket: Bucket): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}`;
    this.httpClient.post<Bucket>(url, bucket, { headers }).subscribe();
  }

  updateBuckets(bucket: Bucket, bucketNew: Bucket): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}/${bucket.Id}`;
    this.httpClient.put<Bucket>(url,bucketNew, { headers }).subscribe();
  }

  deleteBucketById(idBucket: number): void {
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
