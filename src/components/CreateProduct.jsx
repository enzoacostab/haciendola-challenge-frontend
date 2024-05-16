import React, { useContext, useState, useTransition } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import { context } from '@/context/context'

export default function CreateProduct() {
  const { create } = useContext(context)
  const [product, setProduct] = useState({})
  const navigate = useNavigate()
  const [pending, startTransition] = useTransition()

  const handleCreate = (e) => {
    e.preventDefault()
    startTransition(async () => {
      await create(product)
    })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <h2>Product Details</h2>
      <form onSubmit={handleCreate} className='flex w-[80%] lg:w-1/3 flex-col gap-2 mt-2'>
        <Input 
          name='handle' 
          type='text' 
          required 
          placeholder='Handle' 
          onChange={({ target }) => setProduct(prev => ({ ...prev, [target.name]: target.value }))}
        />
        <Input 
          name='title' 
          type='text' 
          required 
          placeholder='Title' 
          onChange={({ target }) => setProduct(prev => ({ ...prev, [target.name]: target.value }))}
        />
        <Input 
          name='description' 
          type='text' 
          required 
          placeholder='Description' 
          onChange={({ target }) => setProduct(prev => ({ ...prev, [target.name]: target.value }))}
        />
        <Input 
          name='grams' 
          type='number' 
          placeholder='Grams' 
          onChange={({ target }) => setProduct(prev => ({ ...prev, [target.name]: target.value }))}
        />
        <Input 
          name='stock' 
          type='number' 
          required 
          placeholder='Stock' 
          onChange={({ target }) => setProduct(prev => ({ ...prev, [target.name]: target.value }))}
        />
        <Input 
          name='sku' 
          type='number' 
          required 
          placeholder='SKU' 
          onChange={({ target }) => setProduct(prev => ({ ...prev, [target.name]: target.value }))}
        />
        <Input 
          name='price' 
          type='number' 
          required 
          placeholder='Price' 
          onChange={({ target }) => setProduct(prev => ({ ...prev, [target.name]: target.value }))}
        />
        <Input 
          name='comparePrice' 
          type='number' 
          required 
          placeholder='Compare Price' 
          onChange={({ target }) => setProduct(prev => ({ ...prev, [target.name]: target.value }))}
        />
        <Input 
          name='barcode' 
          type='number' 
          placeholder='Barcode' 
          onChange={({ target }) => setProduct(prev => ({ ...prev, [target.name]: target.value }))}
        />
        <div className='flex justify-center gap-4'>
          <Button disabled={pending} variant="secondary" className="w-20" name="submit" type="submit">Add</Button>
          <Button disabled={pending} variant="secondary" className="w-20" onClick={handleCancel}>Cancel</Button> 
        </div>
      </form>
    </div>
  )
}
