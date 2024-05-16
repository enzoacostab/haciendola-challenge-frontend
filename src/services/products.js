import axios from 'axios'
const baseUrl = '/api/products'

const getProducts = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createProduct = async (data, auth) => {
  const response = await axios.post(baseUrl, data, auth)
  return response.data
}
const updateProduct = async (data, auth) => {
  const response = await axios.put(`${baseUrl}/${data.id}`, data, auth)
  return response.data
}
const removeProduct = async (id, auth) => {
  await axios.delete(`${baseUrl}/${id}`, auth)
}

export default { getProducts, createProduct, updateProduct, removeProduct }
