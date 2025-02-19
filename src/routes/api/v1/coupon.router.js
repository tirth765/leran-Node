
const express = require('express');
const { couponController } = require('../../../controller/index.js');

const routes = express.Router();

//http://localhost:8000/api/v1/coupon/list-coupons
routes.get(
 "/list-coupons",

 couponController.listCoupons
);

//http://localhost:8000/api/v1/coupon/post-coupon
routes.post(
 "/post-coupon",

 couponController.addCoupon
);

//http://localhost:8000/api/v1/coupon/put-coupon:id
routes.put(
 "/put-coupon/:id",

 couponController.updateCoupon
);

//http://localhost:8000/api/v1/coupon/delete-coupon:id
routes.delete(
 "/delete-coupon/:id",

 couponController.deleteCoupon
);

module.exports = routes;
