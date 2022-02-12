import { Injectable } from '@nestjs/common';

import { ExampleRequest, ExampleResponse } from './types';

@Injectable()
export class ExampleUseCase {
  // constructor() {}

  async handle({ number }: ExampleRequest): Promise<ExampleResponse> {
    return number * 2;
  }
}
