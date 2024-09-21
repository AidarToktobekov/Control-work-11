import { CircularProgress, Grid2, MenuItem, TextField, Typography } from "@mui/material";
import FileInput from "../../UI/FileInput/FileInput";
import { ProductMutation } from "../../types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
// import { createPost } from "./postsThunk";
// import { selectPostFormLoading } from "./postsSlice";
import { useNavigate } from "react-router-dom";
import { selectFormLoading } from "./productsSlice";
import { productCreate } from "./productThunk";
import { selectCategories, selectCategoriesFetching } from "../categories/categoriesSlice";
import { fetchCategories } from "../categories/categoriesThunk";

const NewProduct = ()=>{
    

    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectFormLoading);
    const navigate = useNavigate();
    const categories = useAppSelector(selectCategories);
    const categoriesFetching = useAppSelector(selectCategoriesFetching);

    const [state, setState] = useState<ProductMutation>({
        title: '',
        description: '',
        price: '',
        category: '',
        image: null,
    });

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(productCreate(state));
        navigate('/');
    };
    
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : null;
    
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    return(
        <>
            <Grid2 component='form' onSubmit={submitFormHandler}>
                {false ? (
                    <CircularProgress/>
                ): (
                    <Grid2 display='flex' flexDirection="column" gap='20px' maxWidth='500px' margin='0 auto'>
                        <Typography variant="h3">
                            New product
                        </Typography>
                        <Grid2>
                        <TextField
                            required
                            label="Title"
                            id="title"
                            name="title"
                            value={state.title}
                            onChange={inputChangeHandler}
                        />
                        </Grid2>
                        <Grid2>
                            <TextField
                                label="Description"
                                id="description"
                                name="description"
                                value={state?.description}
                                onChange={inputChangeHandler}
                            />
                        </Grid2>
                        <Grid2>
                            <TextField
                                type="number"
                                label="Price"
                                id="price"
                                name="price"
                                value={state?.price}
                                onChange={inputChangeHandler}
                            />
                        </Grid2>
                        <Grid2>
                            {categoriesFetching ? (
                            <CircularProgress />
                            ) : (
                            <TextField
                                required
                                select
                                label="Category"
                                id="category"
                                name="category"
                                value={state.category}
                                onChange={inputChangeHandler}
                            >
                                <MenuItem value="" disabled>
                                Select category
                                </MenuItem>
                                {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.title}
                                </MenuItem>
                                ))}
                            </TextField>
                            )}
                        </Grid2>
                        <Grid2>
                            <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
                        </Grid2>
                        <Grid2>
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            <span>Save</span>
                        </LoadingButton>
                        </Grid2>
                    </Grid2>
                )}
            </Grid2>
        </>
    )
}

export default NewProduct;