import React, { useContext } from 'react'
import { context } from '@/context/context'
import { Accordion } from "@/components/ui/accordion"
import Product from './Product'

export default function Products() {
  const { products } = useContext(context)

  return (
    <div className='w-full'>
      <Accordion collapsible type='single'>
        {products?.map(product => <Product key={product.id} productData={product}/>)}
      </Accordion>
    </div>
  )
}