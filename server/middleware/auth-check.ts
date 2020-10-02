const authService = require("@greenpress/api-kit/internal-service").service(
  "AUTH",
);

export const authCheck = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  return authService({
    url: "/api/me",
    headers: {
      authorization: req.headers.authorization,
    },
  })
    .then((auth) => {
      req.user = auth.data;
      return next();
    })
    .catch(() => {
      res.status(401).end();
    });
};
