import { TestBed } from '@angular/core/testing';

import { ModeStackService } from './mode-stack.service';

describe('ModeStackService', () => {
  let service: ModeStackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeStackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
