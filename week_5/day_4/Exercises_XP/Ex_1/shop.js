// shop.js
const products = require("./products");

function findProductByName(name) {
  const product = products.find((p) => p.name.toLowerCase() === name.toLowerCase());
  if (product) {
    console.log(`Product Found: ${product.name}, Price: ${product.price} MAD, Category: ${product.category}`);
  } else {
    console.log("Product not found!");
  }
}

findProductByName("Laptop");
findProductByName("Perfume");
findProductByName("Bag");
