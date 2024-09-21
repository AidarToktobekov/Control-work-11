import express from 'express';
import { IProduct, ProductMutation } from '../types';
import {imagesUpload} from '../multer';
import Product from '../models/Product';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';

const productsRouter = express.Router();

productsRouter.get('/', async(req, res, next)=>{
    try {
        const filter: Record<string, unknown> = {};
    
        if (req.query.category) {
          filter.category = req.query.category;
        }
    
        const products = await Product.find(filter).populate('category', 'title');
        return res.send(products);
      } catch (error) {
        next(error);
      }
});

productsRouter.get('/:id', async(req, res, next)=>{
  try {
      const product = await Product.findById(req.params.id);
      return res.send(product);
    } catch (error) {
      next(error);
    }
});

productsRouter.post('/',  auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;            
        const productMutation = {
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            price: parseFloat(req.body.price),
            image: req.file ? req.file.filename : null,
            idUser: user?._id,  
        };

        const product = new Product(productMutation);
        await product.save();
    
        return res.send(product);

    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }
  
      return next(error);
    }
});

productsRouter.delete('/:id', auth, async(req, res, next)=>{
    try{
        const user = (req as RequestWithUser).user; 

        if (!user) {
            return res.status(400).send({error: 'User not found!'});
        }

        const product = await Product.findById(req.params.id);
        
        if (String(user._id) !== String(product?.idUser)) {
            return res.status(403).send({error: 'You do not have permission to delete!'});
        }


        await Product.findByIdAndDelete(req.params.id);

        return res.send(product);
    }catch(e){
        next(e);
    }
});


export default productsRouter;

