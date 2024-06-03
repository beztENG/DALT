import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseManaComponent } from './course-mana.component';

describe('CourseManaComponent', () => {
  let component: CourseManaComponent;
  let fixture: ComponentFixture<CourseManaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseManaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseManaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
