const Coupon = require("../models/coupon.model");
const fs = require("fs");

const listCoupons = async (req, res) => {
  try {
    const coupon = await Coupon.find()
    
    if (!coupon) {
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
        data: coupon,
        message: "All Coupon List Succesfully"
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

const addCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create({ ...req.body })

    if (!coupon) {
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
        data: coupon,
        message: "new coupon created"
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

const updateCoupon = async (req, res) => {
  try {
      let updatedAll;
      const OldCoupon = await Coupon.findById(req.params.id);
      if(req.file){
         updatedAll = {...req.body, cat_img: req.file.path};
          // fs.unlink(OldCoupon.cat_img, (err) => {
          //     if(err){
          //         return res.status(400).json({
          //             success: false,
          //             data: null,
          //             message: "Error in update coupon: " 
          //         })
          //     }
          // })  
      } else {
          updatedAll =  {...req.body}
      }

      const coupon = await Coupon.findByIdAndUpdate(req.params.id,
        updatedAll,
        { new: true, runValidators: true }
      );

      if (!coupon) {
          return res.status(400).json({
              success: false,
              data: null,
              message: "Error during the update."
          })
      }

      res.status(200).json({
          success: true,
          data: coupon,
          message: "coupon updated successfully."
      })
  } catch (error) {
      res.status(500).json({
          success: false,
          data: null,
          message: "Internal server error:" + error.message
      })
  }
}

const deleteCoupon = async (req, res) => {
  console.log(req.params.id);
  
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id)



    if (!coupon) {
      return res.status(400)
        .json({
          success: false,
          data: [],
          message: "Error"
        })
    }

    fs.unlink(coupon.cat_img, (err) => {
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
        data: coupon,
        message: "coupon delete Succesfully"
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
  listCoupons,
  addCoupon,
  updateCoupon,
  deleteCoupon
};
