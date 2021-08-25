class Error404 extends Error {
    constructor(message) {
      super(message);
      this.code = 404;
    }
  }
  module.export = Error404;