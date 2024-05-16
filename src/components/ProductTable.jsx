import React from 'react'
import propTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';

export default function ProductTable({ product, setUpdatedProduct, modify }) {
  const description = product.description.split("\n").filter(e => e != "");

  return (
    <>
      <Table className="h-full">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Grams</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!modify ? (
            <TableRow>
              <TableCell>{product.title}</TableCell>
              <TableCell>{
                description.map((e, i)=> {
                  return e.endsWith(":") ? <strong key={i}>{e}</strong> : <p key={i}>{e}</p> 
                })}
              </TableCell>
              <TableCell>{product.grams}</TableCell>
              <TableCell>{product.stock}</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>
                <Input
                  className="w-[80px]"
                  type="text"
                  name="title" 
                  defaultValue={product.title}
                  onChange={({target}) => setUpdatedProduct(prev => ({ ...prev, [target.name]: target.value }))}>
                </Input>
              </TableCell>
              <TableCell>
                <Textarea
                  className="resize-none h-[200px] w-[200px]"
                  name="description" 
                  defaultValue={product.description}
                  onChange={({target}) => setUpdatedProduct(prev => ({ ...prev, [target.name]: target.value }))}>
                </Textarea>
              </TableCell>
              <TableCell>
                <Input 
                  type="number"
                  name="grams" 
                  defaultValue={product.grams}
                  onChange={({target}) => setUpdatedProduct(prev => ({ ...prev, [target.name]: target.value }))}>
                </Input>
              </TableCell>
              <TableCell>
                <Input 
                  type="number"
                  name="stock" 
                  defaultValue={product.stock}
                  onChange={({target}) => setUpdatedProduct(prev => ({ ...prev, [target.name]: target.value }))}>
                </Input>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Table className="h-full">
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Compare Price</TableHead>
            <TableHead>Barcode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!modify ? ( 
            <TableRow>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.comparePrice}</TableCell>
              <TableCell>{product.barcode}</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>
                <Input 
                  type="number"
                  name="sku" 
                  defaultValue={product.sku}
                  onChange={({target}) => setUpdatedProduct(prev => ({ ...prev, [target.name]: target.value }))}>
                </Input>
              </TableCell>
              <TableCell>
                <Input 
                  type="number"
                  name="price" 
                  defaultValue={product.price}
                  onChange={({target}) => setUpdatedProduct(prev => ({ ...prev, [target.name]: target.value }))}>
                </Input>
              </TableCell>
              <TableCell>
                <Input 
                  type="number"
                  name="comparePrice" 
                  defaultValue={product.comparePrice}
                  onChange={({target}) => setUpdatedProduct(prev => ({ ...prev, [target.name]: target.value }))}>
                </Input>
              </TableCell>
              <TableCell>
                <Input 
                  type="number"
                  name="barcode" 
                  defaultValue={product.barcode}
                  onChange={({target}) => setUpdatedProduct(prev => ({ ...prev, [target.name]: target.value }))}>
                </Input>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

ProductTable.propTypes = {
  product: propTypes.object.isRequired,
  setUpdatedProduct: propTypes.func.isRequired,
  modify: propTypes.bool.isRequired
}