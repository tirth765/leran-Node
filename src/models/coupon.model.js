const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        couponDiscount: {
            type: Number,
            required: true,
            trim: true
        },
        from: {
            type: Date,
            required: true,
        },
        to: {
            type: Date,
            required: true,
        },
        active: {
            type: Boolean
        }
    },
    {
        timestamps: true,
        versionKey: false
    }

);

const Coupons = mongoose.model('Coupons', CouponSchema);

module.exports = Coupons
