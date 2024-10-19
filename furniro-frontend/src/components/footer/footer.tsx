import React from 'react';
import logoFooter from '../../assets/images/logo-footer.svg';
import './footer.css';

const Footer = () => {

    return (
        <div className="footer">

            <div className='footer-top'>
                <div className='footer-info'>
                    <div className="logo-footer">
                        <img src={logoFooter} alt="Furniro Logo" />
                    </div>
                    <div className="footer-text">
                        <p>400 University Drive Suite 200 Coral Gables,</p>
                        <p>FL 33134 USA</p>
                    </div>
                </div>

                <div className='footer-links'>
                    <dl>
                        <dt className='footer-links-title'>Links</dt>
                        <dt className='footer-links-text'><a href="#" >Home</a></dt>
                        <dt className='footer-links-text'><a href="#" >Shop</a></dt>
                        <dt className='footer-links-text'><a href="#" >About</a></dt>
                        <dt className='footer-links-text'><a href="#" >Contact</a></dt>
                    </dl>
                </div>
                
                <div className='footer-help'>
                    <dl>
                        <dt className='footer-links-title'>Help</dt>
                        <dt className='footer-links-text'><a href="#" >Payment Options</a></dt>
                        <dt className='footer-links-text'><a href="#" >Returns</a></dt>
                        <dt className='footer-links-text'><a href="#" >Privacy Policies</a></dt>
                    </dl>

                </div>
                <div className='footer-newsletter'>
                    <dl>
                        <dt className='footer-links-title'>Newsletter</dt>
                        <dt className='footer-subscribe'><a href="#" >SUBSCRIBE</a></dt>
                    </dl>

                </div>
            </div>

            <div className='footer-bottom'>
                <p>2023 furniro. All rights reverved</p>
            </div>
        </div>
        
    );

};

export default Footer