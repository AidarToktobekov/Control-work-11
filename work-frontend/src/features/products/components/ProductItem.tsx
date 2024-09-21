import { Grid2, Card, CardHeader, CardContent, CardActions, IconButton, styled, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { API_URL } from "../../../constants";
import imageNotFound from '../../../assets/images/image-not-found.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Props {
    id: string;
    title: string;
    price: number;
    image: string | null;
}

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
  });
  
const ProductItem: React.FC<Props> = ({ id, title, price, image }) =>{

    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }
    
    return(
        <>
            <Grid2 maxWidth='310px' width='100%'>
                <Card sx={{ height: '100%' }}>
                    <CardHeader title={title} />
                    <ImageCardMedia image={cardImage} title={title} />
                    <CardContent>
                    <strong>Price: {price} KGS</strong>
                    </CardContent>
                    <CardActions>
                    <IconButton component={Link} to={`/products/${id}`}>
                        <ArrowForwardIcon />
                    </IconButton>
                    </CardActions>
                </Card>
            </Grid2>
        </>
    )
}

export default ProductItem;