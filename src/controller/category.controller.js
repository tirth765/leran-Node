const Categores = require("../models/category.model");
const fs = require("fs");

const listCategores = async (req, res) => {
  try {
    const categores = await Categores.find()
    
    if (!categores) {
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
        data: categores,
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

const getCategory = async (req, res) => {
  try {
    const category = await Categores.findById(req.params.id)
    res.json(category)
    if (!category) {
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
        data: category,
        message: "All Category List Succesfully"
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

const addCategory = async (req, res) => {
  try {
    const category = await Categores.create({ ...req.body, cat_img: req.file.path })

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

const getcatNo = async(req, res) => {
  try {
    const catno = await Categores.aggregate(
      [
        {
          $count: "cat no:"
        }
      ]
    )
    
    if (!catno) {
      return res.status(404)
        .json({
          success: false,
          data: null,
          message: "Error"
        })
    }

    return res.status(200)
      .json({
        success: true,
        data: catno,
        message: "All Categore No find"
      })

  } catch (error) {
    return res.status(500)
      .json({
        success: false,
        data: null,
        message: "Internal server Error" + error.message
      })
  }
}

const updateCategory = async (req, res) => {
  try {
      let updatedAll;
      const OldCategory = await Categores.findById(req.params.id);
      if(req.file){
         updatedAll = {...req.body, cat_img: req.file.path};
          // fs.unlink(OldCategory.cat_img, (err) => {
          //     if(err){
          //         return res.status(400).json({
          //             success: false,
          //             data: null,
          //             message: "Error in update category: " 
          //         })
          //     }
          // })  
      } else {
          updatedAll =  {...req.body}
      }

      const category = await Categores.findByIdAndUpdate(req.params.id,
        updatedAll,
        { new: true, runValidators: true }
      );

      if (!category) {
          return res.status(400).json({
              success: false,
              data: null,
              message: "Error during the update."
          })
      }

      res.status(200).json({
          success: true,
          data: category,
          message: "category updated successfully."
      })
  } catch (error) {
      res.status(500).json({
          success: false,
          data: null,
          message: "Internal server error:" + error.message
      })
  }
}

const deleteCategory = async (req, res) => {
  console.log(req.params.id);
  
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

    fs.unlink(category.cat_img, (err) => {
      if(err) {
        return res.status(400)
        .json({
          success: false,
          data: null,
          message: "Error"
        })      
      } 

    
    })


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



const listCategoresActive = async (req, res) => {
  try {
    const categores = await Categores.aggregate(
      [
        {
          $match: {
            isActive: "true"
          }
        },
        {
          $count: 'Number of Acive Categores'
        }
      ]
    )
    

    if (!categores) {
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
        data: categores,
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

const listCategoresMostProduct = async (req, res) => {
  try {
    const categores = await Categores.aggregate(
      [
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "Category",
            as: "result"
          }
        },
         {
          $addFields: {
            Datas: { $size: "$result" }
          }
        },
        {
          $sort: {
           Datas: -1
          }
        },
        {
          $limit: 1
        },
        {
          $project: {
            name: 1,
            Datas:1
          }
        }
      ]
    )
    

    if (!categores) {
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
        data: categores,
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



module.exports = {
  listCategores,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getcatNo,
  listCategoresActive,
  listCategoresMostProduct
};
