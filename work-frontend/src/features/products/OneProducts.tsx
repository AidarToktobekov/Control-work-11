import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productDelete, productFetch, productOwnerFetch } from "./productThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectOwner, selectOwnerLoading, selectProduct, selectProductLoading } from "./productsSlice";
import imageNotFound from '../../assets/images/image-not-found.png';
import { Button, CardMedia, CircularProgress, Grid2, styled, Typography } from "@mui/material";
import { API_URL } from "../../constants";
import { fetchCategory } from "../categories/categoriesThunk";
import { selectCategory, selectCategoryFetching } from "../categories/categoriesSlice";
import { selectUser } from "../users/usersSlice";

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
    const owner = useAppSelector(selectOwner);
    const ownerLoading = useAppSelector(selectOwnerLoading);
    let cardImage = imageNotFound;
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    if (product?.image) {
        cardImage = `${API_URL}/${product?.image}`;
    }

    const onDelete = ()=>{
        dispatch(productDelete(id));
        navigate('/')
    }

    useEffect(()=>{
        dispatch(productFetch(id));
    }, [dispatch]);

    useEffect(()=>{
        dispatch(fetchCategory(product?.category));
        dispatch(productOwnerFetch(product?.idUser));
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
                        <Grid2 marginLeft='auto' display='flex' flexDirection='column' justifyContent='space-between'>
                                {ownerLoading ? (
                                    <CircularProgress/>
                                ):(
                                    <>
                                    <Typography variant="h5">
                                        {owner?.name} | {owner?.phone}
                                    </Typography>   
                                    {user?._id !== product?.idUser ? (
                                        null
                                    ): (
                                        <Button onClick={onDelete} variant="contained">
                                            Delete product
                                        </Button>
                                    )}
                                    </>
                                )}
                        </Grid2>
                    </Grid2>
                )}
            </Grid2>
        </>
    )
}

export default OneProducts;