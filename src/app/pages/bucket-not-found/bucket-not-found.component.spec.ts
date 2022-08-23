import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketNotFoundComponent } from './bucket-not-found.component';

describe('BucketNotFoundComponent', () => {
  let component: BucketNotFoundComponent;
  let fixture: ComponentFixture<BucketNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucketNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
