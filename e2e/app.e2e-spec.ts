import { DupeKiller2Page } from './app.po';

describe('dupe-killer2 App', function() {
  let page: DupeKiller2Page;

  beforeEach(() => {
    page = new DupeKiller2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
