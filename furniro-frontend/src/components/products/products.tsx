import React from 'react';
import './products.css';
import Product from '../product/product';
import { ProductProps } from '../../interfaces/products';

interface Props {
  products: ProductProps[];
  pageType: string;
}

const Products = ({products}: Props) => {
  return (
    <div className="products-container">
      {products.map((product: any) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
