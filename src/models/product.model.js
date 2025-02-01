const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        ProductId: {
            type : mongoose.Types.ObjectId,
            ref: 'SubCategores',
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        product_img: {
            type: String,
        }
       
    },
    {
        timestamps: true,
        versionKey: false

    }
)


const Products = mongoose.model('Products', ProductSchema);

module.exports = Products