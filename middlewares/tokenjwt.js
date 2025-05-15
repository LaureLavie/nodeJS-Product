const jwt = require("jsonwebtoken");

//JWT secret à mettre dans un .env en production
const JWT_SECRET = "DWFS";

// Middleware pour authentifier l'utilisateur avec JWT
const authenticateJWT = (req, res, next) => {
  // récupérer le token du cookie
  const token = req.cookies["token"];

  //log le token, vérifier qu'il y est
  console.log("token from cookie:", req.cookies["token"]);

  if (!token) {
    return res
      .status(403)
      .json({ message: "Cher Padawan, vous n'êtes pas authentifié" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Petit Padawan, votre token est périmé" });
    }
    req.user = decoded; //stocker les infos de l'utilisateur décodé dans l'objet de la requête
  });
  next();
};

module.exports = authenticateJWT;
