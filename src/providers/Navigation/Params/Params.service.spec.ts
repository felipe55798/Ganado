/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParamsService } from './Params.service';

describe('Service: Params', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParamsService]
    });
  });

  it('should ...', inject([ParamsService], (service: ParamsService) => {
    expect(service).toBeTruthy();
  }));
});
