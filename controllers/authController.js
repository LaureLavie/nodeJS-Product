const {
  readUsers,
  writeUsers,
  createUserRoleBased,
} = require("../utils/userutils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = "DWFS";

const registerUser = async (req, res) => {
  try {
    const { username, password, role = "client" } = req.body;
    console.log("Ok, data bien reçue: ", req.body);
    //   vérifier si utilisateur existe
    const users = readUsers();
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Tu es déjà inscrit, jeune Padawan" });
    }
    const saltRounds = 9;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // const newUser = {
    //   username: username,
    //   password: hashedPassword,
    // };

    const newUser = createUserRoleBased(
      {
        username,
        password: hashedPassword,
      },
      role
    );
    users.push(newUser);
    writeUsers(users);

    return res.status(201).json({
      message: "Félicitation, tu es Jedi",
    });
  } catch (error) {
    console.error({ "Ton statut de Jedi a échoué": error });
    return res.status(500).json({
      message:
        "L'administration de Tataouine a planté ton dossier pour devenir Jedi, recommence.",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find((u) => u.username === username);
    if (!user)
      return res
        .status(404)
        .json({ message: "ooh, erreur cher Padawan, je ne t'ai pas trouvé" });

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Ce n'est pas ton mot de passe, Petit Padawan" });

    //create JWT
    const token = jwt.sign(
      {
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    //set token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true, //ça empêche js d'accéder le cookie (XXS attacks)
      sameSite: "strict", //empêche le cookie d'être envoyé avec requetes corss-origin (CSRF)
      maxAge: 3600000, // 1h expiration 60*60*60
    });
    res.json({ message: "Jedi connecté" });
  } catch (error) {
    console.error(
      "ooh, erreur cher Padawan, je ne peux pas te connecter",
      error
    );
    res
      .statut(500)
      .json({ message: "Eh non, le server galactique a planté", error });
  }
};

const logoutUser = (req, res) => {
  //logout user
  res.clearCookie("token", {
    httpOnly: true, // prevent js access
    sameSite: "strict", // prevent CSRF
    path: "/", //path is sest to root
  });
  res.status(200).json({
    message: "Jedi, tu es déconnecté",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
