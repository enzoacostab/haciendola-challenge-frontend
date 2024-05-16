import React, { useContext, Suspense, lazy, useEffect } from 'react'
import Loader from './components/Loader'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './components/ui/toaster'
import { context } from './context/context'
import './services/index'
import './App.css'
import './index.css'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import CreateProduct from './components/CreateProduct'
import Products from './components/Products'

export default function App() {
  const { products } = useContext(context)

  if (!products) {
    return <Loader/>
  } else {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Header/>}>
            <Route path='/' element={<Products/>}/>
            <Route path='/add-product' element={<CreateProduct/>}/>
          </Route>
        </Routes>
        <Toaster/>
      </ThemeProvider>
    )
  }
}
