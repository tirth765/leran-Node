const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        SubCategory: {
            type : mongoose.Types.ObjectId,
            ref: 'SubCategores',
        }, 
        Category: {
            type : mongoose.Types.ObjectId,
            ref: 'Categores',
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
        price: {
            type: Number,
            required: true
        },
        product_img: {
            type: String,
            required:true
        }
       
    },
    {
        timestamps: true,
        versionKey: false

    }
)


const Products = mongoose.model('products', ProductSchema);

module.exports = Products