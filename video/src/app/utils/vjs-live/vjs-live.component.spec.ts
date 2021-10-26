import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VjsLiveComponent } from './vjs-live.component';

describe('VjsLiveComponent', () => {
  let component: VjsLiveComponent;
  let fixture: ComponentFixture<VjsLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VjsLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VjsLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
