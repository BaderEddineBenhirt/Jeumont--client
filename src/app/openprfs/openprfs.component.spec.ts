import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenprfsComponent } from './openprfs.component';

describe('OpenprfsComponent', () => {
  let component: OpenprfsComponent;
  let fixture: ComponentFixture<OpenprfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenprfsComponent]
    });
    fixture = TestBed.createComponent(OpenprfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
