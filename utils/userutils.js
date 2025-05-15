const fs = require("fs");
const userDB = "./db/users.json";
const { v4: uuidv4 } = require("uuid");

// read utilisateur de la bd/ json parse
const readUsers = () => {
  try {
    if (fs.existsSync(userDB)) {
      const data = fs.readFileSync(userDB, "utf-8");
      //   operation ternaire:envoyer un tableau vide au cas où data inexistente
      return data ? JSON.parse(data) : [];
    }
    return [];
  } catch (error) {
    console.error("Attention, jeune padawan, il y a une erreur", error);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(userDB, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Tu es passé dans le côté obscur", error);
  }
};

//ajouter utilisateur avec rôle
const createUserRoleBased = (userData, role = "client") => {
  const user = {
    id: uuidv4(),
    ...userData,
    role,
  };
  const usersList = readUsers();
  usersList.push(user);
  writeUsers(usersList);
  return user;
};

module.exports = {
  writeUsers,
  readUsers,
  createUserRoleBased,
};
