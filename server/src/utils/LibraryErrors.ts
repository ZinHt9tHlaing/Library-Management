export class UnableToSaveUseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidUsernameOrPasswordError extends Error {
  constructor(message: string) {
    super(message);
  }
}
