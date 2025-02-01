const Products = require("../models/product.model");
const fs = require("fs");

const getproducts = async (req, res) => {
  try {
    const products = await Products.find()

    if (!products) {
      return res.status(400)
        .json({
          success: false,
          data: null,
          message: "Error"
        })
    }

    return res.status(200)
      .json({
        success: true,
        data: products,
        message: "All Categores List Succesfully"
      })

  } catch (error) {
    return res.status(500)
      .json({
        success: false,
        data: null,
        message: "Internal server Error" + error.message
      })
  }
};

const postproduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = await Products.create({ ...req.body, product_img: req.file.path })
    if (!product) {
      return res.status(400)
        .json({
          success: false,
          data: [],
          message: "Error"
        })
    }
    return res.status(201)
      .json({
        success: true,
        data: product,
        message: "new product created"
      })

  } catch (error) {
    return res.status(500)
      .json({
        success: false,
        data: [],
        message: "Internal server Error" + error.message
      })
  }
};

const putproduct = (req, res) => {
  try {
    res.send("put product");
  } catch (error) {
    console.log(error);
  }
};

const deleteproduct = (req, res) => {
  try {
    res.send("delete product");
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getproducts,
  postproduct,
  putproduct,
  deleteproduct
}