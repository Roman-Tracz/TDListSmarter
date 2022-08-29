import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';
import { MatTooltipModule} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/bucket/modal.component';
import { HttpClientModule } from '@angular/common/http';

import { BucketListComponent } from './components/bucket-list/bucket-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TitleComponent } from './components/page-title/page.title.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { BucketDetailsComponent } from './components/bucket-details/bucket-details.component';
import { BucketDetailsPage } from './pages/bucket-details-page/bucket-details-page.component';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { BucketNotFoundComponent } from './pages/bucket-not-found/bucket-not-found.component';
import { BucketHasBeenDeletedComponent } from './pages/bucket-has-been-deleted/bucket-has-been-deleted.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    WelcomeComponent,
    TitleComponent,
    StatisticsComponent,
    BucketDetailsComponent,
    BucketDetailsPage,
    TaskListComponent,
    ModalComponent,
    BucketNotFoundComponent,
    BucketHasBeenDeletedComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'bucketDetails', component: BucketDetailsPage},
      {path: 'bucketDetails/:id', component: BucketDetailsPage},
    ]),
    BrowserAnimationsModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
