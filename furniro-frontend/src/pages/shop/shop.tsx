import React from 'react';
import Header from '../../components/header/header';
import PreFooter from '../../components/preFooter/preFooter';
import Footer from '../../components/footer/footer';
import bannerShop from '../../assets/images/bannerShop.jpg';

const Shop: React.FC = () => {
  return (
    <div>
      <Header />
      
      <div className='banner-shop'>
        <img src={bannerShop} alt="Banner Shop" />
        <div className='banner-shop-text'>
          <h1>Shop</h1>
          <p>Home </p>
          
          <p>Shop</p>
        </div>

      </div>





      <PreFooter/>
      <Footer />
    </div>
  );
};

export default Shop;
