import { LandingComponent } from './landing.component';
import { Router } from '@angular/router';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    component = new LandingComponent(routerSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /dashboard after 3 seconds on ngOnInit', (done) => {
    jasmine.clock().install();
    component.ngOnInit();
    jasmine.clock().tick(3000);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    jasmine.clock().uninstall();
    done();
  });
});
