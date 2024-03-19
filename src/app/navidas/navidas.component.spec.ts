import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavidasComponent } from './navidas.component';

describe('NavidasComponent', () => {
  let component: NavidasComponent;
  let fixture: ComponentFixture<NavidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
