import * as React from 'react'
import { useParams } from 'react-router-dom'

export const Product = () => {
  const { product } = useParams<{product: string}>()

  return (
    <div>Product page: {product}</div>
  )
}
