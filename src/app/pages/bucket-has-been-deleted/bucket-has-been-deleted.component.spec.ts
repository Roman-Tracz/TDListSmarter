import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketHasBeenDeletedComponent } from './bucket-has-been-deleted.component';

describe('BucketHasBeenDeletedComponent', () => {
  let component: BucketHasBeenDeletedComponent;
  let fixture: ComponentFixture<BucketHasBeenDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucketHasBeenDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketHasBeenDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
