const Categores = require("../models/category.model");

const listCategores = async (req, res) => {
 try {
  const categores = await Categores.find()
  res.json(categores)
  if(!categores) {
    return res.status(400) 
    .json({
      success:false,
      data : null,
      message: "Error"
    })
  }

  return res.status(200) 
  .json({
    success:true,
    data : categores,
    message: "All Categores List Succesfully"
  })

 } catch (error) {
  return res.status(500) 
  .json({
    success:false,
    data : null,
    message: "Internal server Error" + error.message
  })
 }
};

const getCategory = async (req, res) => {
  try {
   const category = await Categores.findById(req.params.id)
   res.json(category)
   if(!category) {
     return res.status(400) 
     .json({
       success:false,
       data : null,
       message: "Error"
     })
   }
 
   return res.status(200) 
   .json({
     success:true,
     data : category,
     message: "All Category List Succesfully"
   })
 
  } catch (error) {
   return res.status(500) 
   .json({
     success:false,
     data : null,
     message: "Internal server Error" + error.message
   })
  }
 };

const addCategory = async (req, res) => {
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

const updateCategory = async(req, res) => {
  console.log(req.params.id);
  
  try {
    const category = await Categores.findByIdAndUpdate(req.params.id, req.body)

    if (!category) {
      return res.status(400)
        .json({
          success: false,
          data: [],
          message: "Error"
        })
    }
    return res.status(200)
      .json({
        success: true,
        data: category,
        message: "category Updated Succesfully"
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

const deleteCategory = async(req, res) => {
  try {
    const category = await Categores.findByIdAndDelete(req.params.id)

    if (!category) {
      return res.status(400)
        .json({
          success: false,
          data: [],
          message: "Error"
        })
    }
    return res.status(200)
      .json({
        success: true,
        data: category,
        message: "category delete Succesfully"
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

module.exports = {
  listCategores,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
};
