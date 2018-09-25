import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchFormComponent } from './launch-form.component';

describe('LaunchFormComponent', () => {
  let component: LaunchFormComponent;
  let fixture: ComponentFixture<LaunchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
