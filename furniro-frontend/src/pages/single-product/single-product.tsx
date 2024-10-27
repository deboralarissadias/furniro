import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Tabs from "../../components/tabs/tabs";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import { ProductProps } from "../../interfaces/products";
import { GET_PRODUCT, GET_PRODUCTS } from "../../config/endpoints";
import { productsMock } from "../../components/products/mockData";
import "./single-product.css"
import ProductsContainer from "../../components/products/products";
import iconFacebook from "../../assets/icons/icon-facebook.svg";
import iconLinkedin from "../../assets/icons/icon-linkedin.svg";
import iconTwitter from "../../assets/icons/icon-twitter.svg";

const SingleProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductProps | any>({});
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  // Estado para armazenar a imagem selecionada
  const [selectedImage, setSelectedImage] = useState(product.image_link);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    // Fazendo a requisição para o endpoint
    const fetchProduct = async () => {
      const url = GET_PRODUCT.replace("{id}", `${id}`);

      try {
        const response = await fetch(url); // Substitua pela URL real do seu endpoint
        const data = await response.json(); // Supondo que a resposta esteja em formato JSON
        setProduct(data); // Atualiza o estado com os produtos
        setLoading(false); // Define que o carregamento foi concluído
        setSelectedImage(data.image_link);

      } catch (error) {
        setProduct(productsMock[0]);
        console.error("Erro ao buscar produto pelo ID:", error);
        setLoading(false); // Em caso de erro, para o carregamento
      }
    };

    // Fazendo a requisição para o endpoint
    const fetchProducts = async () => {
      try {
        const categoryId = product?.category_id || 1;
        const response = await fetch(
          GET_PRODUCTS + "?page=1&limit=4&categoryId=" + categoryId
        ); 
        const dataProducts = await response.json();
        setProducts(dataProducts.products);
        setLoading(false);
      } catch (error) {
        setProducts(productsMock);
        console.error("Erro ao buscar produtos:", error);
        setLoading(false); 
      }
    };
    
    fetchProducts(); 
    fetchProduct(); // Chama a função ao montar o componente
  }, []); // O array vazio [] garante que o efeito será executado apenas uma vez ao montar o componente

  function convertToSlug(name: string) {
    if (!name) {
      return "";
    }

    return name
      .toLowerCase() // Converte para minúsculas
      .trim() // Remove espaços em branco do início e do fim
      .replace(/[^a-z0-9 -]/g, "") // Remove caracteres especiais
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .replace(/-+/g, "-"); // Substitui múltiplos hífens por um único hífen
  }

  const breadcrumbPaths = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    {
      name: product.name,
      path: "/product/" + product.id + "/" + convertToSlug(product.name),
    },
  ];

  // Função para atualizar a imagem principal
  const handleThumbnailClick = (image: any) => {
    setSelectedImage(image);
  };

  const handleShowMore = () => {
    navigate("/products?categoryId=" + product.category_id);
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };




  const generateStarsRating = (rating: number, showRating: boolean, totalReviews: number) => {
    const stars = [];
  
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (rating > i - 1 && rating < i) {
        stars.push(<span key={i} className="star half-filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }
  
    return (
      <div className="stars-rating">
        {stars}
        {showRating && (
          <span className="stars-rating-text">{totalReviews} Customer Reviews</span>
        )}
      </div>
    );
  };

  const currentUrl = window.location.href;

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentUrl)}`, "_blank");
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`, "_blank");
  };

  console.log("product", product);


  return (
    <div>
      <Header />
      <Breadcrumb paths={breadcrumbPaths} isSingleProduct={true} />

      <div className="product-details-container">
        <div className="product-details">
          <div className="product-images">
            <img
              src={selectedImage}
              alt={product.name}
              className="main-image"
            />
            <div className="thumbnail-images">
              {product?.other_images_link?.map((image: any) => (
                <img 
                  src={image}
                  alt={product.name}
                  key={image}
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>
          <div className="product-info">
            <h1 className="product-title">{product.name || ""}</h1>
            <p className="price">Rp. {formatPrice(product.price || 0)}</p>
            <div className="ratings">
              <div className="stars-rating">
                {product.reviews && generateStarsRating(product.reviews.rating || 0, true, product.reviews.total_reviews || 0)}
              </div>
            </div>
            <p className="description">
              {product.description || ""}
            </p>

            <div className="product-options">
              <span>Size</span>
              <div className="size-options">
                {product.variants?.size?.map((size: any) => (
                  <button
                    key={size}
                    className={selectedSize === size ? "size-btn active" : "size-btn"}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="color-options">
                <span>Color</span>
                <div className="color-options">
                  {product.variants?.color?.map((color: any) => (
                    <button
                      key={color}
                      className={selectedColor === color ? "color active" : "color"}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color, borderColor: selectedColor === color ? "#000" : color }}
                    >
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="add-to-cart-container">
              <div className="quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))} // Atualiza o estado com o novo valor
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <div className="action-buttons">
                <button className="add-to-cart">Add to Cart</button>
                <button className="compare">+ Compare</button>
              </div>
            </div>


            <div className="product-meta">
              <p>SKU: {product.sku || ""}</p>
              <p>Category: {product.category_id || ""}</p>
              <p>Tags: {product.tags || ""}
              </p>
            </div>

            <div className="share">
              <p>Share:</p>
              <i className="icon-facebook" style={{cursor: 'pointer'}}><img src={iconFacebook} alt="Facebook" onClick={shareOnFacebook}/></i>
              <i className="icon-linkedin" style={{cursor: 'pointer'}}><img src={iconLinkedin} alt="LinkedIn" onClick={shareOnLinkedIn}/></i>
              <i className="icon-twitter" style={{cursor: 'pointer'}}><img src={iconTwitter} alt="Twitter" onClick={shareOnTwitter}/></i>
            </div>
          </div>
        </div>
      </div>

      <div className="description">
        <Tabs />
      </div>

      
      <div className="single-products">
        <h1 className="single-products-text">Related Products</h1>
        <ProductsContainer products={products} pageType="single" />
        <button className="single-products-button" onClick={handleShowMore}>
          Show More
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default SingleProduct;