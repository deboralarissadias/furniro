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

  return (
    <div>
      <Header />
      <Breadcrumb paths={breadcrumbPaths} isSingleProduct={true} />

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
          <h1 className="product-title">{product.name}</h1>
          <p className="price">Rp.{product.price}</p>
          <div className="ratings">
            <span>⭐⭐⭐⭐⭐</span> | <span>5 Customer Reviews</span>
          </div>
          <p className="description">
            Setting the bar as one of the loudest speakers in its class, the
            Kilburn is a compact, stout-hearted hero with a well-balanced audio
            which boasts a clear midrange and extended highs for a sound.
          </p>

          <div className="product-options">
              <label>Size</label>
            <div className="size-options">
              <button>L</button>
              <button>XL</button>
              <button>XS</button>
            </div>
            <div className="color-options">
              <label>Color</label>
              <button className="color purple"></button>
              <button className="color black"></button>
              <button className="color brown"></button>
            </div>
          </div>

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

          <div className="product-meta">
            <p>SKU: SS001</p>
            <p>Category: {product.category_id}</p>
            <p>Tags: Sofa, Chair, Home, Shop</p>
          </div>

          <div className="share">
            <p>Share:</p>
            <a href="#">
              <i className="icon-facebook"><img src={iconFacebook}/></i>
            </a>
            <a href="#">
              <i className="icon-linkedin"><img src={iconLinkedin}/></i>
            </a>
            <a href="#">
              <i className="icon-twitter"><img src={iconTwitter}/></i>
            </a>
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
