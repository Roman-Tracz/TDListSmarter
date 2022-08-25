import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BucketListComponent } from './components/bucket-list/bucket-list.component';

import { BucketDetailsPage } from './pages/bucket-details-page/bucket-details-page.component';
import { BucketHasBeenDeletedComponent } from './pages/bucket-has-been-deleted/bucket-has-been-deleted.component';
import { BucketNotFoundComponent } from './pages/bucket-not-found/bucket-not-found.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [

  { path: '',                     component: BucketListComponent },
  { path: 'bucketDetails'       , component: BucketDetailsPage },
  { path: 'bucketDetails/:id'   , component: BucketDetailsPage },
  { path: 'bucketDetails?:id'   , component: BucketDetailsPage },
  { path: 'bucketNotFound'      , component: BucketNotFoundComponent },
  { path: 'bucketHasBeenDeleted', component: BucketHasBeenDeletedComponent },
  { path: '**'                  , component: PageNotFoundComponent },
  { path: '404'                 , component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }

export const routingComponents = [

]
