import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeltsStudyComponent } from './ielts-study.component';

describe('IeltsStudyComponent', () => {
  let component: IeltsStudyComponent;
  let fixture: ComponentFixture<IeltsStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeltsStudyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeltsStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
