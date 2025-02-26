const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
    {
        Category: {
            type : mongoose.Types.ObjectId,
            ref: 'Categores',
        },
        
        name: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        subcat_img: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false

    }
)


const SubCategores = mongoose.model('SubCategores', SubCategorySchema);

module.exports = SubCategores