const jwt = require("jsonwebtoken");

const ensureAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }

  const match = authHeader.trim().match(/^Bearer\s+(\S+)$/i);

  if (!match) {
    return res.status(401).json({
      error: "Token format is invalid",
    });
  }

  const token = match[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (
      !decoded ||
      typeof decoded !== "object" ||
      typeof decoded.sub !== "string" ||
      !decoded.sub
    ) {
      return res.status(401).json({
        error: "Invalid token payload",
      });
    }

    // Salva o ID do usuário (subject) na requisição para uso no controller
    req.userId = decoded.sub;

    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

module.exports = ensureAuthenticated;
