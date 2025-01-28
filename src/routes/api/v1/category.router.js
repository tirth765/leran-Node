 const { categoryController } = require("../../../controller/index.js");
 const express = require('express');
const upload = require("../../../middleware/Upload.js");

const routes = express.Router();

//http://localhost:8000/api/v1/category/get-categores
routes.get(
  "/get-categores",

  categoryController.getCategores
);

//http://localhost:8000/api/v1/category/post-category
routes.post(
  "/post-category",
  upload.single('cat_img'), 
  categoryController.postCategores
);

//http://localhost:8000/api/v1/category/put-category:id
routes.put(
  "/put-category:id",

  categoryController.putCategores
);

//http://localhost:8000/api/v1/category/delete-category:id
routes.delete(
  "/delete-category:id",

  categoryController.deleteCategores
);

module.exports = routes;
