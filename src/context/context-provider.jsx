import { useEffect, useState } from "react";
import propTypes from "prop-types"
import { context } from "./context";
import { toast } from "@/components/ui/use-toast";
import productsService from "@/services/products";
import { useNavigate, useMatch } from "react-router-dom";
import userService from "@/services/users";

const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState(null)
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(null)
  const [userId, setUserId] = useState(null)
  const { updateProduct, removeProduct, getProducts, createProduct } = productsService
  const { getUser } = userService
  const navigate = useNavigate()
  const match = useMatch('/')
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (!loggedUserJSON && match) {
      navigate('/login')
    }

    if (loggedUserJSON && !auth && !userId) {
      try {
        const loggedUser = JSON.parse(loggedUserJSON)
        setUserId(loggedUser.id)
        setAuth({ headers: { Authorization: `Bearer ${loggedUser.token}` } })
      } catch (error) {
        console.error(error);
      }
    }

    if (!products) {
      getProducts()
        .then(products => setProducts(products))
    }

    if (auth && userId) {
      getUser(auth, userId)
        .then(user => setUser(user))
    }
  }, [auth, products, getProducts, getUser, userId, navigate, match])

  const create = async (data) => {
    try {
      const newProduct = await createProduct(data, auth)
      setProducts(prev => [newProduct, ...prev])
      toast({ description: 'Product added!', title: 'Success'})
      navigate('/')
    } catch (err) {
      console.error(err);
      toast({ description: err.message || 'Something went wrong...' })
    }
  }

  const update = async (data) => {
    try {
      await updateProduct(data, auth)
      toast({ description: 'Product updated!', title: "Success" })
    } catch (err) {
      console.error(err);
      toast({ description: err.message || 'Something went wrong...' })
    }
  }

  const remove = async (id) => {
    try {
      await removeProduct(id, auth)
      setProducts(prev => prev.filter(product => product.id != id))
      toast({ description: 'Product removed!', title: "Success" })
    } catch (err) {
      console.error(err);
      toast({ description: err.message || 'Something went wrong...' })
    }
  }

  return (
    <context.Provider value={{
      products, setProducts,
      user, setUser,
      auth, setAuth,
      userId, setUserId,
      update,
      remove,
      create
    }}>
      {children}
    </context.Provider>
  )
}

ContextProvider.propTypes = {
  children: propTypes.element.isRequired
}

export default ContextProvider