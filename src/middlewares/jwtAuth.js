const jwt = require("jsonwebtoken");

class JwtAuth {
  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.defaultOptions = {
      algorithm: "HS256", // Default algorithm
      expiresIn: "1h", // Default expiration time
    };
  }

  sign(payload, options = {}) {
    const signOptions = { ...this.defaultOptions, ...options };
    return jwt.sign(payload, this.secret, signOptions);
  }

  verify(token, options = {}) {
    const verifyOptions = { algorithms: ["HS256"], ...options };
    return jwt.verify(token, this.secret, verifyOptions);
  }
}

module.exports = new JwtAuth();
