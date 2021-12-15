import { Injectable } from '@nestjs/common';

type ExampleRequest = {
  number: number;
};

type ExampleResponse = number;

@Injectable()
export class ExampleUseCase {
  // constructor() {}

  async handle({ number }: ExampleRequest): Promise<ExampleResponse> {
    return number * 2;
  }
}
