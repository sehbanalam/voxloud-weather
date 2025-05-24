import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { Router } from '@angular/router';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /dashboard after 3 seconds on ngOnInit', fakeAsync(() => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.ngOnInit();
    tick(3000);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));
});
