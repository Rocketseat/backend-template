export abstract class UseCaseError {
  name: string;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
