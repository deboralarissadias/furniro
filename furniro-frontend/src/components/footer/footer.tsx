import React, { useState } from 'react';
import logoFooter from '../../assets/images/logo-footer.svg';
import './footer.css';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    }


    const handleChange = (event: any) => {
        setEmail(event.target.value);
        setError(false); // Reseta o erro ao alterar o email
        setSuccess(false); // Reseta a mensagem de sucesso ao alterar o email
    };

    const handleSubscribe = (event: any) => {
        event.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setError(true);
            setSuccess(false);
        } else {
            setError(false);
            setSuccess(true); // Exibe a mensagem de sucesso
            console.log('Email válido:', email);
        }
    };
    
    return (
        <div className="footer">

            <div className='footer-top'>
                <div className='footer-info'>
                    <div className="logo-footer">
                        <img src={logoFooter} alt="Furniro Logo" onClick={handleLogoClick} style={{cursor: 'pointer'}} />
                    </div>
                    <div className="footer-text">
                        <p>400 University Drive Suite 200 Coral Gables,</p>
                        <p>FL 33134 USA</p>
                    </div>
                </div>

                <div className='footer-links'>
                    <dl>
                        <dt className='footer-links-title'>Links</dt>
                        <dt className='footer-links-text'><Link to="/" >Home</Link></dt>
                        <dt className='footer-links-text'><Link to="/shop">Shop</Link></dt>
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
                    {success && <div className="email-success">Successfully subscribed!</div>}
                </div>
            </div>

            <div className='footer-bottom'>
                <p>2023 furniro. All rights reverved</p>
            </div>
        </div>
        
    );

};

export default Footer