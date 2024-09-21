import mongoose, { Types } from "mongoose";
import Category from "./Category";
import User from "./User";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Category',
        validate: {
            validator: async(value: Types.ObjectId)=>{
                const category = await Category.findById(value);
                return Boolean(category);
            },
            message: 'Category does not exist',
        } ,
    },
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
        validate: {
            validator: async(value: Types.ObjectId)=>{
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User not found',
        } ,
    },

});

const Product = mongoose.model('Product', ProductSchema);

export default Product;