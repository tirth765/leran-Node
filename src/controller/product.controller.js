
const Products = require("../models/product.model");
const fs = require("fs");
const SubCategores = require("../models/subCategory.model");

const getproducts = async (req, res) => {
  try {
    const { page, limit } = req.query;

    let products;

    if(page && limit) {
      products = await Products.find().skip((page-1)*limit).limit(limit);
    } else {
      products = await Products.find()
    }

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
        message: "All Product List Succesfully"
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

const getSubcat = async (req, res) => {
  try {
    console.log(req.params.id);
    
    const subcat = await SubCategores.find({Category: req.params.id})

    if (!subcat) {
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
        data: subcat,
        message: "All Product List Succesfully"
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

const putproduct = async(req, res) => {
  try {
    let updatedAll;
    
    const OldCategory = await Products.findById(req.params.id);
    if(req.file){
       updatedAll = {...req.body, product_img: req.file.path};
        fs.unlink(OldCategory.product_img, (err) => {
            if(err){
                return res.status(400).json({
                    success: false,
                    data: null,
                    message: "Error in update category: " 
                })
            }
        })
    } else {
        updatedAll =  {...req.body}

    }

    const product = await Products.findByIdAndUpdate(req.params.id,
      updatedAll,
      { new: true, runValidators: true }
    );

    if (!product) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Error during the update."
        })
    }

    res.status(200).json({
        success: true,
        data: product,
        message: "updated successfully."
    })
} catch (error) {
    res.status(500).json({
        success: false,
        data: null,
        message: "Internal server error:" + error.message
    })
}
};

const deleteproduct = async(req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id)
    
    if (!product) {
      return res.status(400)
        .json({
          success: false,
          data: [],
          message: "Error"
        })
    }

    fs.unlink(product.product_img, (err) => {
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
        data: product,
        message: "product delete Succesfully"
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

const searchProduct = async (req, res) => {
  try {
    console.log(req.query);
    
    const matchObj = {}
    const { category, min, max, rating } = req.query


    if(category) {
      matchObj["category_id"] = parseInt(category)
    }

    if(rating) {
      matchObj["AvgRating"] = {$gte : parseFloat(rating)}
    }

    if(max || min) {
      matchObj["Variant.attributes.Price"] = {}
    }

    if(min) {
      matchObj["Variant.attributes.Price"].$gte = parseFloat(min)
    }

    if(max) {
      matchObj["Variant.attributes.Price"].$lte = parseFloat(max)
    }

    const pipeline = [
      {
        $lookup: {
          from: "variant",
          localField: "_id",
          foreignField: "product_id",
          as: "Variant"
        }
      },
      {
        $unwind: "$Variant"
      },
      {
        $lookup: {
          from: "review",	
          localField: "_id",
          foreignField: "product_id",
          as: "Review"
        }
      },
      {
        $addFields: {
          AvgRating: {$avg : "$Review.rating"}
        }
      },
      {
        $match: matchObj
      },
      {
        $group: {
          _id: "$_id",
          category_id : {$first : "$category_id"},
          subcategory_id : {$first : "$subcategory_id"},
          name: {$first: "$name"},
          variant : {$push: "$Variant.attributes" },
          rating : {$first: "$AvgRating"},
        }
      },
      {
        $sort :{
          name: 1
        }
      }
     
    ]

   

  console.log(matchObj);
  
  console.log(ProductSearch);

  
   


  } catch (error) {
    
  }
}


module.exports = {
  getproducts,
  postproduct,
  putproduct,
  deleteproduct,
  getSubcat,
  searchProduct
}