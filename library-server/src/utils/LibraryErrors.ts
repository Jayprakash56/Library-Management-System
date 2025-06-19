export class UnableToSaveUserError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidUsernameOrPassword extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UserDoesNotExistError extends Error {
  constructor(message: string) {
    super(message);
  }
}


export class BookDoesNotExistsError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class LibraryCardDoesNotExistsError extends Error {
  constructor(message: string) {
    super(message); 
  }
}
export class LoanRecordDoesNotExistError extends Error {
  constructor(message: string) {
    super(message); 
  }
}
