import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject Router via constructor', () => {
    const router = TestBed.inject(Router);
    expect((component as any).router).toBe(router);
  });

  it('should navigate to home when navigateToHome is called', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.navigateToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
