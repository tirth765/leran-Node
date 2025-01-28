const SubCategores = require("../models/subCategory.model");

const getsubCategores = (req, res) => {
    try {
      res.send("get subcategores");
    } catch (error) {
      console.log(error);
    }
  };
  
  const postsubCategores = async(req, res) => {
    try {

      console.log(req.body);
  
      const subCategory = await SubCategores.create(req.body)
      if (!subCategory) {
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
          data: subCategory,
          message: "new subCategory created"
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
  
  const putsubCategores = (req, res) => {
    try {
      res.send("put subcategory");
    } catch (error) {
      console.log(error);
    }
  };
  
  const deletesubCategores = (req, res) => {
    try {
      res.send("delete subcategory");
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = {
    getsubCategores,
    postsubCategores,
    putsubCategores,
    deletesubCategores
  };