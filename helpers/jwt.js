const { expressjwt: jwt } = require('express-jwt');

function authJwt() {
  const secret = process.env.JWT_SECRET;
  const api = process.env.API_URL;

  return jwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
      { url: /\/api\/v1\/users\/.*/, methods: ['GET'] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    return true;
  }

  return false;
}

module.exports = authJwt;
