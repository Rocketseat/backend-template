import { ExampleUseCase } from '@application/use-cases/example-use-case';

describe('Example UseCase', () => {
  let exampleUseCase: ExampleUseCase;

  beforeEach(() => {
    exampleUseCase = new ExampleUseCase();
  });

  it('should be able to run example use case', async () => {
    const response = await exampleUseCase.handle({
      number: 5,
    });

    expect(response).not.toBeNaN();
    expect(response).toBe(10);
  });
});
