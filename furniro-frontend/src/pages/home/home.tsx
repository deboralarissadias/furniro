import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import PreFooter from "../../components/preFooter/preFooter";
import dining from "../../assets/images/dining.jpg";
import living from "../../assets/images/living.jpg";
import bedroom from "../../assets/images/bedroom.jpg";
import ProductsContainer from "../../components/products/products";
import { ProductProps } from "../../interfaces/products";
import { GET_PRODUCTS } from "../../config/endpoints";
import { productsMock } from "../../components/products/mockData";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductProps[]>([]); // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    // Fazendo a requisição para o endpoint
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          GET_PRODUCTS + "?page=1&limit=8"
        );
        const dataProducts = await response.json(); 
        setProducts(dataProducts.products); // Atualiza o estado com os produtos
        setLoading(false); // Define que o carregamento foi concluído
      } catch (error) {
        setProducts(productsMock);
        console.error("Erro ao buscar produtos:", error);
        setLoading(false); // Em caso de erro, para o carregamento
      }
    };

    fetchProducts(); // Chama a função ao montar o componente
  }, []); // O array vazio [] garante que o efeito será executado apenas uma vez ao montar o componente

  const handleShowMore = () => {
    navigate("/products");
  };

  return (
    <div className="home">
      <Header />

      <div className="home-banner">
        <div className="home-banner-rectangle">
          <p className="home-banner-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
        </div>
      </div>

      <div className="browse">
        <h1 className="browse-text">Browse The Range</h1>
        <div className="browse-items">
          <div className="browse-item">
            <Link to="/products?category=1">
              <img src={dining} alt="dining" />
            </Link>
            <p>Dining</p>
          </div>
          <div className="browse-item">
            <Link to="/products?category=2">
              <img src={living} alt="living" />
            </Link>
            <p>Living</p>
          </div>
          <div className="browse-item">
            <Link to="/products?category=3">
              <img src={bedroom} alt="bedroom" />
            </Link>
            <p>Bedroom</p>
          </div>
        </div>
      </div>

      <div className="home-products">
        <h1 className="home-products-text">Our Products</h1>
        <ProductsContainer products={products} pageType="home" />
        <button className="home-products-button" onClick={handleShowMore}>
          Show More
        </button>
      </div>

      <PreFooter />
      <Footer />
    </div>
  );
}

export default Home;