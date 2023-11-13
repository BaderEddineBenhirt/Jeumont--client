import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPlanningComponent } from './config-planning.component';

describe('ConfigPlanningComponent', () => {
  let component: ConfigPlanningComponent;
  let fixture: ComponentFixture<ConfigPlanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigPlanningComponent]
    });
    fixture = TestBed.createComponent(ConfigPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
