const Products = require("../models/product.model");

const getproducts = (req, res) => {
    try {
      res.send("get product");
    } catch (error) {
      console.log(error);
    }
  };
  const postproduct = async(req, res) => {
    try {
      console.log(req.body);
      const product = await Products.create(req.body)
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