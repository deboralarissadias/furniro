import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Tabs from '../../components/tabs/tabs';

const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Header />

      <div className='description'>
        <Tabs />
      </div>





      <h1>Product Details for Product ID: {id}</h1>
      <Footer />
    </div>
  );
};

export default SingleProduct;
