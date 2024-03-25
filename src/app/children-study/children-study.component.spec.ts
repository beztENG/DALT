import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenStudyComponent } from './children-study.component';

describe('ChildrenStudyComponent', () => {
  let component: ChildrenStudyComponent;
  let fixture: ComponentFixture<ChildrenStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenStudyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrenStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
