import React from 'react';
import logo from '../../logo.svg';
import './home.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PreFooter from '../../components/preFooter/preFooter';
import homeBanner from '../../assets/images/homeBanner.jpg';
import dining from '../../assets/images/dining.jpg';
import living from '../../assets/images/living.jpg';
import bedroom from '../../assets/images/bedroom.jpg';

function Home() {
  return (
    <div className="home">
      <Header />

      <div className="home-banner">
        <div className="home-banner-rectangle">
          <p className='home-banner-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
        </div>
      </div>

      <div className='browse'>
        <h1 className='browse-text'>Browse The Range</h1>
        <div className='browse-items'>
          <div className='browse-item'>
            <a href="#"><img src={dining} alt="dining" /></a>
            <p>Dining</p>
          </div>
          <div className='browse-item'>
            <a href="#"><img src={living} alt="living" /></a>
            <p>Living</p>
          </div>
          <div className='browse-item'>
            <a href="#"><img src={bedroom} alt="bedroom" /></a>
            <p>Bedroom</p>
          </div>

        </div>
      </div>





      <PreFooter/>
      <Footer />

    </div>
  );
}

export default Home;
