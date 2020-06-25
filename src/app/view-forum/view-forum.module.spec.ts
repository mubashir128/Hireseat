import { ViewForumModule } from './view-forum.module';

describe('ViewForumModule', () => {
  let viewForumModule: ViewForumModule;

  beforeEach(() => {
    viewForumModule = new ViewForumModule();
  });

  it('should create an instance', () => {
    expect(viewForumModule).toBeTruthy();
  });
});
