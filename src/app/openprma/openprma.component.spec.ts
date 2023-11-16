import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenprmaComponent } from './openprma.component';

describe('OpenprmaComponent', () => {
  let component: OpenprmaComponent;
  let fixture: ComponentFixture<OpenprmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenprmaComponent]
    });
    fixture = TestBed.createComponent(OpenprmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
