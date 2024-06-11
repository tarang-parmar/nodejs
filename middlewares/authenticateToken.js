import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const secret_token = "qwertyuiopasdfghjklzxcvbnm123456";
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret_token, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default authenticateToken;
