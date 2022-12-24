import { TestBed } from '@angular/core/testing';

import { CattleTypeService } from './cattle-type.service';

describe('CattleTypeService', () => {
  let service: CattleTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattleTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
