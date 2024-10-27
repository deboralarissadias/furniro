import React, { useState } from 'react';
import logoFooter from '../../assets/images/logo-footer.svg';
import './footer.css';

const Footer = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const handleSubscribe = (event: any) => {
        event.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
        setError(true);
        } else {
        setError(false);
        // Coloque aqui o que deve acontecer no envio do email válido
        console.log('Email válido:', email);
        }
    };

    const handleChange = (event: any) => {
        setEmail(event.target.value);
        setError(false);
    };
    
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
                <div className="footer-newsletter">
                    <h1 className="newsletter-title">Newsletter</h1>
                    <div className="newsletter-input-container">
                        <input
                        type="email"
                        id="email-input"
                        className="email-input"
                        placeholder="Enter Your Email Address"
                        value={email}
                        onChange={handleChange}
                        required
                        />
                        <button className="btn-subscribe" id="subscribe-btn" onClick={handleSubscribe}>
                        SUBSCRIBE
                        </button>
                    </div>
                    {error && <div className="email-error">Please enter a valid email address.</div>}
                </div>
            </div>

            <div className='footer-bottom'>
                <p>2023 furniro. All rights reverved</p>
            </div>
        </div>
        
    );

};

export default Footer