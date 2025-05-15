const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const filePath = "./db/products.json";
const readDB = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return [];
};

const writeDB = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const createProductId = (productData) => {
  const product = {
    id: uuidv4(),
    ...productData,
  };
  const productList = readDB();
  productList.push(product);
  writeDB(productList);
  return product;
};

module.exports = {
  readDB,
  writeDB,
  createProductId,
};
