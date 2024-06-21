import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBookComponent } from './student-book.component';

describe('StudentBookComponent', () => {
  let component: StudentBookComponent;
  let fixture: ComponentFixture<StudentBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
