class Error401 extends Error {
    constructor(message) {
      super(message);
      this.code = 401;
    }
  }
  module.export = Error401;