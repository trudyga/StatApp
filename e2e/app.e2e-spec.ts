import { StatAppPage } from './app.po';

describe('stat-app App', () => {
  let page: StatAppPage;

  beforeEach(() => {
    page = new StatAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
