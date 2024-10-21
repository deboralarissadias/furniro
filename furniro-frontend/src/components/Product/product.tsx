import React from 'react';
import './product.css';
import { ProductProps } from '../../interfaces/products';
import { useNavigate } from 'react-router-dom';
import share from '../../assets/icons/share.svg';
import compare from '../../assets/icons/compare.svg';
import like from '../../assets/icons/like.svg';

interface Props {
    product: ProductProps;
}

const Product = ({product}: Props ) => {
  const navigate = useNavigate();

  function convertToSlug(name:string) {
    if (!name) {
      return '';
    }
    
    return name
      .toLowerCase() // Converte para minúsculas
      .trim() // Remove espaços em branco do início e do fim
      .replace(/[^a-z0-9 -]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-'); // Substitui múltiplos hífens por um único hífen
  }

  const handleSeeDetails = () => {
    navigate(`/product/${product.id}/${product.sku}/${convertToSlug(product.name)}`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image_link} alt={product.name} className='main-img'/>
        <div className="hover-overlay">
          <button className="see-details-btn" onClick={handleSeeDetails} >See Details</button>
          <div className="hover-overlay-links">
            <a href="#" className='hover-overlay-links-group'>
              <i className='hover-overlay-links-icon'><img src={share} alt="share" /></i>
              <span>Share</span>
            </a>
            <a href="#" className='hover-overlay-links-group'>
              <i className='hover-overlay-links-icon'><img src={compare} alt="compare" /></i>
              Compare
            </a>
            <a href="#" className='hover-overlay-links-group'>
              <i className='hover-overlay-links-icon'><img src={like} alt="like" /></i>
              Like
            </a>
          </div>
        </div>
        {product.discount_percent && (
          <div className="badge-discount">
            -{product.discount_percent}%
          </div>
        )}
        {product.is_new && <div className="badge-new">New</div>}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className='product-description'>{product.description}</p>
        <p className='product-price'>
          Rp {product.price.toLocaleString()}
          {product.discount_price && (
            <span className="discount-price">
              Rp {product.discount_price.toLocaleString()}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Product;
