import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardManagementComponent } from './dashboard-management.component';

describe('DashboardManagementComponent', () => {
  let component: DashboardManagementComponent;
  let fixture: ComponentFixture<DashboardManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
