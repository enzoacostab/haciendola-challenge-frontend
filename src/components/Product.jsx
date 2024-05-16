import React, { useContext, useEffect, useRef, useState, useTransition } from 'react'
import propTypes from 'prop-types'
import { Button } from './ui/button'
import { Pen } from 'lucide-react'
import { DeleteButton } from './DeleteButton'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { context } from '@/context/context'
import ProductTable from './ProductTable'
import { Input } from './ui/input'

export default function Product({ productData }) {
  const [product, setProduct] = useState(productData)
  const [updatedProduct, setUpdatedProduct] = useState(productData)
  const [modify, setModify] = useState(false)
  const { update, remove } = useContext(context)
  const [pending, startTransition] = useTransition()

  const handleUpdate = () => {
    startTransition(async () => {
      setProduct(updatedProduct)
      setModify(false)
      await update(updatedProduct)
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      await remove(product.id)
    })
  }

  return (
    <AccordionItem value={product.id}>
      <AccordionTrigger className="hover:no-underline active:underline sm:hover:underline">
        <h2>{product.handle}</h2> 
      </AccordionTrigger>
      <AccordionContent>
          <Input
            className={`w-fit mt-1 ml-1 transition-all ${!modify ? '-translate-y-7 h-0 opacity-0' : ''}`}
            type="text"
            name="handle" 
            defaultValue={product.handle}
            onChange={({target}) => setUpdatedProduct(prev => ({ ...prev, [target.name]: target.value }))}>
          </Input>
        <div className='flex flex-col lg:flex-row mt-3'>
          <ProductTable modify={modify} setUpdatedProduct={setUpdatedProduct} product={product}/>
          <div className='flex lg:flex-col ml-auto min-w-[85px] items-center mt-2 lg:my-auto gap-5'>
            {modify ? (
              <>
                <Button disabled={pending} className="w-full" onClick={() => handleUpdate()}>Confirm</Button>
                <Button disabled={pending} className="w-full" onClick={() => setModify(false)}>Cancel</Button>

              </>
            ) : (
              <>
                <Button disabled={pending} onClick={() => setModify(true)} variant="secondary" className="w-10 h-10 p-0">
                  <Pen size={20}></Pen>
                </Button>
                <DeleteButton handleDelete={handleDelete} pending={pending}/>
              </>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

Product.propTypes = {
  productData: propTypes.object.isRequired
}
