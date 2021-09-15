import { TestBed } from '@angular/core/testing';

import { PostListResolverService } from './post-list-resolver.service';

describe('PostListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostListResolverService = TestBed.get(PostListResolverService);
    expect(service).toBeTruthy();
  });
});
