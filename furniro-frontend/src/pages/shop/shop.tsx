import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import PreFooter from '../../components/preFooter/preFooter';
import Footer from '../../components/footer/footer';
import './shop.css';
import { productsMock } from '../../components/products/mockData';
import { GET_PRODUCTS } from '../../config/endpoints';
import { ProductProps } from '../../interfaces/products';
import Breadcrumb from '../../components/breadcrumb/breadcrumb';
import ProductsContainer from '../../components/products/products';


const Shop: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]); // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [limit, setLimit] = useState(16);

  useEffect(() => {
    // Fazendo a requisição para o endpoint
    const fetchProducts = async () => {
      try {
        const response = await fetch(GET_PRODUCTS + `?limit=${limit}`); // Substitua pela URL real do seu endpoint
        const data = await response.json(); // Supondo que a resposta esteja em formato JSON
        console.log("Produtos recebidos na SHop PAge:", data);
        setProducts(data); // Atualiza o estado com os produtos
        setLoading(false); // Define que o carregamento foi concluído
      } catch (error) {
        setProducts(productsMock);
        console.error('Erro ao buscar produtos:', error);
        setLoading(false); // Em caso de erro, para o carregamento
      }
    };

    fetchProducts(); // Chama a função ao montar o componente
  }, []); // O array vazio [] garante que o efeito será executado apenas uma vez ao montar o componente

  const breadcrumbPaths = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ];

  return (
    <div>
      <Header />

      <div className='banner-shop'>
          <h1 banner-shop-text>Shop</h1>
          <Breadcrumb paths={breadcrumbPaths} isSingleProduct={false} />
      </div>






      

      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <div className='shop-products'>
            <ProductsContainer products={products} pageType="shop" />
          </div>
          )}

      <PreFooter />
      <Footer />
    </div>
  );
};

export default Shop;
