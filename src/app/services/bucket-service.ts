import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Bucket } from '../models/bucket-model';
import { BUCKETS } from '../models/bucket-mock';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor() { }

  getBuckets(): Observable<Bucket[]> {
    BUCKETS.sort((a,b) => a.Id - b.Id);
    const buckets = of(BUCKETS);
    return buckets;
  }

  addBucket(bucket: Bucket): void {
    BUCKETS.push(bucket);
  }

  updBuckets(bucket: Bucket, bucketNew: Bucket): void {
    let index = BUCKETS.indexOf(bucket);
    BUCKETS[index] = bucketNew;
  }

  delBuckets(bucket: Bucket): void {
    let index = BUCKETS.indexOf(bucket);
    if(index !== -1){
      delete BUCKETS[index];
    }
  }

  delBucketById(idBucket: number): void {
    BUCKETS.forEach((element, index)=>{
      if(element.Id === idBucket){
        delete BUCKETS[index];
      }
   });
  }

  getBucketsMaxId(): number {
    let bucketSorted = BUCKETS;
    const sorted = bucketSorted.sort((a,b) => b.Id - a.Id);
    return  sorted[0].Id + 1;
  }

}
