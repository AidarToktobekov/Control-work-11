import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { productsFetch } from "./productThunk";
import { selectProducts, selectProductsLoading } from "./productsSlice";
import { CircularProgress, Grid2 } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductItem from "./components/ProductItem";
import CategoriesMenu from "../categories/components/CategoriesMenu";
import { selectCategories } from "../categories/categoriesSlice";
import { fetchCategories } from "../categories/categoriesThunk";


const Products = ()=>{

    const {id} = useParams();
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const loading = useAppSelector(selectProductsLoading);
    const categories = useAppSelector(selectCategories);

    useEffect(()=>{
        dispatch(fetchCategories());
        dispatch(productsFetch(id));
    },[dispatch, id])

    return(
        <>
        <Grid2 container spacing={2}>
            <Grid2 sx={{ width: 200 }}>
                <CategoriesMenu categories={categories} />
            </Grid2>
            <Grid2 display='flex' gap='20px' justifyContent='center' flexGrow={1}>
                {loading ? (
                    <CircularProgress />
                ):(
                    products.map((product)=>{
                        return(
                            <ProductItem id={product._id} price={product.price} title={product.title} image={product.image} key={product._id}/>
                        )
                    })
                )}
                </Grid2>
        </Grid2>
        </>
    )
}

export default Products;