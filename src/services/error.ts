export default class ErrorService extends Error {
  constructor(name: string, message: string, ...params: any) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorService);
    }

    this.name = name;
    this.message = message;
  }
}
