const jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const { domain, audience } = require('../config/env.dev');
const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-iuxihd45.us.auth0.com/.well-known/jwks.json',
  }),
  audience: audience,
  issuer: `https://${domain}/`,
  algorithms: ['RS256'],
});
module.exports = {
  checkJwt,
};
