 const { categoryController } = require("../../../controller/index.js");
 const express = require('express');
const upload = require("../../../middleware/Upload.js");
const auth = require("../../../middleware/auth.js");

const routes = express.Router();

//http://localhost:8000/api/v1/category/list-categores
routes.get(
  "/list-categores",
  categoryController.listCategores
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
  auth(["admin"]),
  categoryController.addCategory
);

//http://localhost:8000/api/v1/category/put-category:id
routes.put(
  "/put-category/:id",
  auth(["admin"]),
  upload.single('cat_img'), 
  categoryController.updateCategory
);

//http://localhost:8000/api/v1/category/delete-category:id
routes.delete(
  "/delete-category/:id",
  auth(["admin"]),
  categoryController.deleteCategory
);

module.exports = routes;