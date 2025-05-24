import { AppComponent } from './app.component';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    component = new AppComponent(routerSpy);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
