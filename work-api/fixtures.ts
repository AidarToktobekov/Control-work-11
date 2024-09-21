import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Product from './models/Product';
import Category from './models/Category';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('products');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const firstUser = new User({
    username: 'JOHn',
    displayName: 'John',
    phoneNumber: '213213123213',
    password: '123',
  });
  const secondUser = new User({
    username: 'Tommas',
    displayName: 'Tommy',
    phoneNumber: '54213213213',
    password: '123',
  })
  
  firstUser.generateToken();
  secondUser.generateToken();
  await firstUser.save();
  await secondUser.save();
  
  const [category1, category2, category3] = await Category.create(
    {
      title: "Car",
    }, {
      title: "Computer",
    }, {
      title: "Other",
    }
  )
  
  await Product.create(
    {
      title: "Iphone11",
      description: 'text',
      price: '432',
      image: 'fixtures/iphone11.jpeg',
      category: category1,
      idUser: firstUser,
    }, {
      title: "Mersedes-s-class",
      description: 'text',
      price: '1233',
      image: 'fixtures/mers.jpeg',
      category: category2,
      idUser: firstUser,
    }, {
      title: "Iphone11",
      description: 'text',
      price: '432',
      image: 'fixtures/car.jpeg',
      category: category3,
      idUser: secondUser,
    }
  )
  
  await db.close();
};

run().catch(console.error);