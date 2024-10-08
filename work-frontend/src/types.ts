export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    phoneNumber: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}


export interface IProduct{
    _id: string;
    idUser: string;
    category: string;
    title: string;
    description: string;
    price: number;
    image: string | null;
}
  
export interface ProductMutation{
    category: string;
    title: string;
    description: string;
    price: string;
    image: string | null;
}

export interface Category{
    title: string;
    _id: string;
}