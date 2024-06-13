import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultStudyComponent } from './adult-study.component';

describe('AdultStudyComponent', () => {
  let component: AdultStudyComponent;
  let fixture: ComponentFixture<AdultStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdultStudyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdultStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
