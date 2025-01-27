const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
    {
        SubCategoryId: {
            type : mongoose.type.ObjectId,
            ref: 'category',
            required: true
        },
        name: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        description: {
            type: String,
            unique: true,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
        versionKey: false

    }
)


const SubCategores = mongoose.model('SubCategores', SubCategorySchema);

module.exports = SubCategores