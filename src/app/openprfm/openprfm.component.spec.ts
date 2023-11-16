import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenprfmComponent } from './openprfm.component';

describe('OpenprfmComponent', () => {
  let component: OpenprfmComponent;
  let fixture: ComponentFixture<OpenprfmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenprfmComponent]
    });
    fixture = TestBed.createComponent(OpenprfmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
