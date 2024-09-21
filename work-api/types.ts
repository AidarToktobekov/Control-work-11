import { Model, ObjectId } from 'mongoose';

export interface UserFields {
    username: string;
    password: string;
    displayName: string;
    phoneNumber: string;
    token: string;
  }

  export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
  }
  
  export type UserModel = Model<UserFields, {}, UserMethods>;

export interface IProduct{
  _id: ObjectId;
  idUser: ObjectId;
  category: ObjectId;
  title: string;
  description: string;
  price: number;
  image: string | null;
}

export type ProductMutation = Omit<IProduct, '_id'>