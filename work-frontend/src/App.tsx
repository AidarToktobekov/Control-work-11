import './App.css'
import AppToolbar from './UI/AppToolbar/AppToolbar'
import { Container, Typography } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Register from './features/users/Register'
import Login from './features/users/Login'
import Products from './features/products/Products'
import OneProducts from './features/products/OneProducts'
import NewProduct from './features/products/NewProduct'

const App = ()=>{

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/categories/:id" element={<Products/>} />
          <Route path="/products/:id" element={<OneProducts/>} />
          <Route path="/new-product" element={<NewProduct/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
