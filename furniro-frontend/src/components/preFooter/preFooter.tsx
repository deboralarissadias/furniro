import React from 'react';
import './preFooter.css';
import high from '../../assets/icons/high.svg';
import warranty from '../../assets/icons/warranty.svg';
import free from '../../assets/icons/free.svg';
import support from '../../assets/icons/support.svg';

const PreFooter = () => {

    return (
        <div className="preFooter">

            <div className='high'>
                <div className='high-icon'>
                    <img src={high} alt="High Icon" />
                </div>
                <div className="high-text">
                    <p className='high-text-title'>High Quality</p>
                    <p className='high-text-desc'>crafted from top materials</p>
                </div>
            </div>

            <div className='warranty'>
                <div className='warranty-icon'>
                    <img src={warranty} alt="Warranty Icon" />
                </div>
                <div className="warranty-text">
                    <p className='warranty-text-title'>Warranty Protection</p>
                    <p className='warranty-text-desc'>Over 2 years</p>
                </div>
            </div>

                <div className='free'>
                    <div className='free-icon'>
                        <img src={free} alt="Free Icon" />
                    </div>
                    <div className="free-text">
                        <p className='free-text-title'>Free Shipping</p>
                        <p className='free-text-desc'>Order over 150 $</p>
                    </div>
                </div>

                <div className='support'>
                    <div className='support-icon'>
                        <img src={support} alt="Support Icon" />
                    </div>
                    <div className="support-text">
                        <p className='support-text-title'>24/7 Support</p>
                        <p className='support-text-desc'>Dedicated support</p>
                    </div>
                </div>

        </div>
        
    );
};
export default PreFooter