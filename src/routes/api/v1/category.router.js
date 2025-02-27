 const { categoryController } = require("../../../controller/index.js");
 const express = require('express');
const upload = require("../../../middleware/Upload.js");

const routes = express.Router();

//http://localhost:8000/api/v1/category/list-categores
routes.get(
  "/list-categores",

  categoryController.listCategores
);

routes.get(
  "/catno-categor",

  categoryController.getcatNo
);

//http://localhost:8000/api/v1/category/get-category
routes.get(
  "/get-category/:id",
  categoryController.getCategory
);

//http://localhost:8000/api/v1/category/post-category
routes.post(
  "/post-category",
  upload.single('cat_img'), 
  categoryController.addCategory
);

//http://localhost:8000/api/v1/category/put-category:id
routes.put(
  "/put-category/:id",
  upload.single('cat_img'), 
  categoryController.updateCategory
);

//http://localhost:8000/api/v1/category/delete-category:id
routes.delete(
  "/delete-category/:id",

  categoryController.deleteCategory
);



//http://localhost:8000/api/v1/category/count-active
routes.get(
  "/count-active",

  categoryController.listCategoresActive
);


//http://localhost:8000/api/v1/category/most-products
routes.get(
  "/most-products",

  categoryController.listCategoresMostProduct
);

module.exports = routes;
