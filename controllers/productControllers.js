const { readDB, createProductId, writeDB } = require("../utils/productUtils");

const getAllProducts = (req, res) => {
  const products = readDB();
  res.json(products);
};

const createProduct = (req, res) => {
  const { nom, marque, prix, stock, utilite, niveau_de_sum } = req.body;

  const newProduct = createProductId({
    nom,
    marque,
    prix,
    stock,
    utilite,
    niveau_de_sum,
  });
  res.status(201).json({
    message: "Bravo petit padawan ... ton article a été ajouté!",
    product: newProduct,
  });
};

const UpdateProduct = (req, res) => {
  const { id } = req.params;
  const { nom, marque, prix, stock, utilite, niveau_de_sum } = req.body;
  let products = readDB();
  let product = products.find((c) => c.id === id);
  if (!product) {
    return res.status(404).json({
      message:
        "Oh non, ton prdouit est introuvable !, allez, jeune Padawan, courage à toi",
    });
  }
  product.nom = nom || product.nom;
  product.marque = marque || product.marque;
  product.prix = prix || product.prix;
  product.stock = stock || product.stock;
  product.utilite = utilite || product.utilite;
  product.niveau_de_sum = niveau_de_sum || product.niveau_de_sum;

  writeDB(products);
  res.json({
    message: "ta liste de produits a été mis à jour, force à toi, Padawan !",
    product,
  });
};

const deleteproduct = (req, res) => {
  const { id } = req.params;
  let products = readDB();
  const index = products.findIndex((c) => c.id === id);
  if (index === -1) {
    return res
      .status(404)
      .json({ message: "Mince, Produit introuvable ! jeune Padawan" });
  }
  produits.splice(index, 1);
  writeDB(produits);
  res.json({ message: "La produit a été lasérisé" });
};

module.exports = {
  getAllProducts,
  createProduct,
  UpdateProduct,
  deleteproduct,
};
