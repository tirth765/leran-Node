const Categores = require("../models/category.model");

const getCategores = async (req, res) => {
  try {
    res.send("get categores");
  } catch (error) {
    console.log(error);
  }
};

const postCategores = async (req, res) => {
  try {

    console.log("hi ",req.body);

    const category = await Categores.create({...req.body, cat_img: req.file.path})

    if (!category) {
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
        data: category,
        message: "new category created"
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

const putCategores = (req, res) => {
  try {
    res.send("put category");
  } catch (error) {
    console.log(error);
  }
};

const deleteCategores = (req, res) => {
  try {
    res.send("delete category");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCategores,
  postCategores,
  putCategores,
  deleteCategores
};
