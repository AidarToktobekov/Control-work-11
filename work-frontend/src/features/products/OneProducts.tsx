import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { productFetch } from "./productThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProduct, selectProductLoading } from "./productsSlice";
import imageNotFound from '../../assets/images/image-not-found.png';
import { CardMedia, CircularProgress, Grid2, styled, Typography } from "@mui/material";
import { API_URL } from "../../constants";
import { fetchCategory } from "../categories/categoriesThunk";
import { selectCategory, selectCategoryFetching } from "../categories/categoriesSlice";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
  });
const OneProducts = ()=>{

    
    const {id} = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectProduct);
    const productLoading = useAppSelector(selectProductLoading);
    const category = useAppSelector(selectCategory);
    const categoryLoading = useAppSelector(selectCategoryFetching);
    let cardImage = imageNotFound;

    if (product?.image) {
        cardImage = `${API_URL}/${product?.image}`;
    }

    useEffect(()=>{
        dispatch(productFetch(id));
    }, [dispatch]);

    useEffect(()=>{
        console.log('yes');
        
        dispatch(fetchCategory(product?.category));
    }, [dispatch, product])

    return(
        <>
            <Grid2>
                {productLoading ? (
                    <CircularProgress/>
                ):(
                    <Grid2 display='flex' gap='20px'>
                        <Grid2 width='250px' border='1px solid #ccc'>
                            <ImageCardMedia image={cardImage}/>
                        </Grid2>
                        <Grid2>
                            <Typography variant="h3">
                                {product?.title}
                            </Typography>
                            <Typography>
                                {product?.description}
                            </Typography>
                            <Typography variant="h5">
                                {categoryLoading ? (
                                    <CircularProgress/>
                                ):(
                                    <>
                                        {category?.title}
                                    </>
                                )}
                            </Typography>
                            <Typography variant="h5">
                                {product?.price}$
                            </Typography>
                        </Grid2>
                    </Grid2>
                )}
            </Grid2>
        </>
    )
}

export default OneProducts;