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
import iconFilter from '../../assets/icons/icon-filter.svg';
import iconGrid from '../../assets/icons/icon-grid.svg';
import iconList from '../../assets/icons/icon-list.svg';


const Shop: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]); // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [limit, setLimit] = useState(16);
  const [sort, setSort] = useState("default");
  const [listLength, setListLength] = useState(0);

  // Fazendo a requisição para o endpoint
  const fetchProducts = async (limit?: number, sort?: string) => {
    let params = "";
    if (limit) {
      params += `?limit=${limit}`;
    }

    if (sort) {
      params += `&sort=${sort}`;
    }

    try {
      const response = await fetch(GET_PRODUCTS + params); // Substitua pela URL real do seu endpoint
      const data = await response.json(); // Supondo que a resposta esteja em formato JSON
      setProducts(data); // Atualiza o estado com os produtos
      setLoading(false); // Define que o carregamento foi concluído
    } catch (error) {
      setProducts(productsMock);
      console.error('Erro ao buscar produtos:', error);
      setLoading(false); // Em caso de erro, para o carregamento
    }
  };

  useEffect(() => {
    const fetchProductsAll = async () => {
      try {
        const response = await fetch(GET_PRODUCTS); // Substitua pela URL real do seu endpoint
        const data = await response.json(); // Supondo que a resposta esteja em formato JSON
        setListLength(data.length);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProductsAll();
    fetchProducts(limit); // Chama a função ao montar o componente
  }, []); // O array vazio [] garante que o efeito será executado apenas uma vez ao montar o componente

  const breadcrumbPaths = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ];

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
    fetchProducts(newLimit, sort);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;
    setSort(newSort);
    fetchProducts(limit, newSort);
  };

  return (
    <div>
      <Header />

      <div className='banner-shop'>
          <h1 banner-shop-text>Shop</h1>
          <Breadcrumb paths={breadcrumbPaths} isSingleProduct={false} />
      </div>

      <div className='filter-bar-container'>
        <div className='filter-bar'>
          <div className='filter-left'>
            <div className='filter-button'>
              <img src={iconFilter} alt='icon filter' width={25} height={25} />
              <span className='filter-text'>Filter</span>
            </div>
            <img className='grid-list' src={iconGrid} alt='icon grid' width={25} height={25} />
            <img className='grid-list' src={iconList} alt='icon list' width={25} height={25} />
            <span className='show-results'>Showing 1–16 of {listLength} results</span>
          </div>


          <div className='filter-right'>
            <div className='filter-limit'>
              <span className='limit-text'>Show</span>
              <input className='limit-input' type="number" value={limit} onChange={(e) => handleLimitChange(e)} />
            </div>
            <div className='filter-sort'>
              <span className='sort-text'>Short by</span>
              <select className='sort-select' name="sort" id="sort" value={sort} onChange={(e) => handleSortChange(e)}>
                <option value={"default"} hidden>Default</option>
                <option value={"asc"}>Crescente</option>
                <option value={"desc"}>Descrescente</option> 
              </select>
            </div>   
            
          </div>
        </div>
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
