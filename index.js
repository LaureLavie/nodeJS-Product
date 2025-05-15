const express = require("express");
const productRouter = require("./routes/productRoutes");
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const app = express();

const host = "localhost";
const PORT = 4000;

app.use(express.json());
app.use(cookieParser());
app.use("/products", productRouter);
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(
    `Va, jeune Padawan, ta destinée se trouve sur http://${host}:${PORT}`
  );
});
