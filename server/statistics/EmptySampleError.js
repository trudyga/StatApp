'use strict';

class EmptySampleError extends Error {
  constructor(message) {
    if (!message)
      message = 'Empty sample data was recieved for statistical analisys';
    super(message);
    Error.captureStackTrace(this, EmptySampleError)
  }
}
