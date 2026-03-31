import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should create the app', () => {
    const app = new AppComponent();
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FrontEndDemo'`, () => {
    const app = new AppComponent();
    expect(app.title).toBe('FrontEndDemo');
  });
});
