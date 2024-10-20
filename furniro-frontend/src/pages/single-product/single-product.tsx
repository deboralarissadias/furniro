import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Tabs from '../../components/tabs/tabs';
import Breadcrumb from '../../components/breadcrumb/breadcrumb';
import { ProductProps } from '../../interfaces/products';
import { GET_PRODUCT } from '../../config/endpoints';
import { productsMock } from '../../components/products/mockData';

const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductProps | any>({}); 
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    // Fazendo a requisição para o endpoint
    const fetchProduct = async () => {
      const url = GET_PRODUCT.replace("{id}", `${id}`);

      try {
        const response = await fetch(url); // Substitua pela URL real do seu endpoint
        const data = await response.json(); // Supondo que a resposta esteja em formato JSON
        console.log("Produtos recebidos na SHop PAge:", data);
        setProduct(data); // Atualiza o estado com os produtos
        setLoading(false); // Define que o carregamento foi concluído

        
      } catch (error) {
        setProduct(productsMock[0]);
        console.error('Erro ao buscar produto pelo ID:', error);
        setLoading(false); // Em caso de erro, para o carregamento
      }
    };

    fetchProduct(); // Chama a função ao montar o componente
  }, []); // O array vazio [] garante que o efeito será executado apenas uma vez ao montar o componente

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

  const breadcrumbPaths = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: product.name, path: '/product/' + product.id + '/' + convertToSlug(product.name) },
  ];

  return (
    <div>
      <Header />
      <Breadcrumb paths={breadcrumbPaths} isSingleProduct={true} />

      <div className='description'>
        <Tabs />
      </div>





      <h1>Product Details for Product ID: {id}</h1>
      <Footer />
    </div>
  );
};

export default SingleProduct;
