import { Grid2, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Category } from '../../../types';
import React from 'react';

interface Props {
  categories: Category[];
}

const CategoriesMenu: React.FC<Props> = ({ categories }) => {
  const { categoryId } = useParams();

  return (
    <Grid2 container direction="column" spacing={2}>
      <Grid2>
        <Typography variant="h6">Categories</Typography>
      </Grid2>
      <Grid2>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" selected={!categoryId}>
              <ListItemText primary="All items" />
            </ListItemButton>
          </ListItem>
          {categories.map((category) => (
            <ListItem key={category._id} disablePadding>
              <ListItemButton
                component={Link}
                to={`/categories/${category._id}`}
                selected={category._id === categoryId}
              >
                <ListItemText primary={category.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid2>
    </Grid2>
  );
};

export default CategoriesMenu;