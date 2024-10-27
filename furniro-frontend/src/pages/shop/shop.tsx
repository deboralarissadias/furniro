import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/header";
import PreFooter from "../../components/preFooter/preFooter";
import Footer from "../../components/footer/footer";
import "./shop.css";
import { productsMock } from "../../components/products/mockData";
import { GET_PRODUCTS } from "../../config/endpoints";
import { ProductProps } from "../../interfaces/products";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import ProductsContainer from "../../components/products/products";
import iconFilter from "../../assets/icons/icon-filter.svg";
import iconGrid from "../../assets/icons/icon-grid.svg";
import iconList from "../../assets/icons/icon-list.svg";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/spinner/spinner";

const Shop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParams = queryParams.get("category");

  const [products, setProducts] = useState<ProductProps[]>([]); // Estado para armazenar os produtos
  const [dataProducts, setDataProducts] = useState<any>({}); // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [limit, setLimit] = useState(16);
  const [sort, setSort] = useState("default");
  const [listLength, setListLength] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>(
    categoryParams || ""
  );
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(Math.min(limit, listLength));
  const dropdownRef: any = useRef(null);

  // Fazendo a requisição para o endpoint
  const fetchProducts = async (
    page: number = 1,
    limit: number = 16,
    sort?: string,
    category?: string
  ) => {
    let params = "?page=" + page;

    if (limit) {
      params += `&limit=${limit}`;
    }

    if (sort) {
      params += `&sort=${sort}`;
    }

    if (category) {
      params += `&categoryId=${category}`;
    }

    try {
      const response = await fetch(GET_PRODUCTS + params); // Substitua pela URL real do seu endpoint
      const productsData = await response.json(); // Supondo que a resposta esteja em formato JSON
      setProducts(productsData.products);
      setDataProducts(productsData);

      if (category) {
        const filteredProductsLength = productsData.products.length;
        setListLength(filteredProductsLength);
        if (filteredProductsLength === 0) {
          setStart(0);
          setEnd(0);
        } else {
          // Atualizando o "start" e "end" com base nos novos produtos filtrados
          const newStart = (page - 1) * limit + 1;
          const newEnd = Math.min(page * limit, filteredProductsLength);
          setStart(newStart);
          setEnd(newEnd);
        }
      } else {
        setListLength(productsData.totalProducts); // Atualiza o número total de produtos com base no filtro
        // Atualizando o "start" e "end" com base nos novos produtos
        const newStart = (page - 1) * limit + 1;
        const newEnd = Math.min(page * limit, productsData.totalProducts);
        setStart(newStart);
        setEnd(newEnd);
      }

      setLoading(false); // Define que o carregamento foi concluído
      
    } catch (error) {
      setProducts(productsMock); // Fallback para mock de produtos
      console.error("Erro ao buscar produtos:", error);
      setLoading(false); // Em caso de erro, para o carregamento
    }
  };

  useEffect(() => {
    setLoading(true); // Garante que o loading seja exibido ao mudar o filtro
    if (categoryParams) {
      fetchProducts(currentPage, limit, undefined, categoryParams);
    } else {
      fetchProducts(currentPage, limit);
    }

    scrollToTop();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryParams]); // O array vazio [] garante que o efeito será executado apenas uma vez ao montar o componente

  const breadcrumbPaths = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
    fetchProducts(currentPage, newLimit, sort);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;
    setSort(newSort);
    fetchProducts(currentPage, limit, newSort);
  };

  // Função para alternar o dropdown
  const toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Função para aplicar filtro de categoria
  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    setCurrentPage(1); // Resetando para a primeira página quando um novo filtro é aplicado
    fetchProducts(1, 16); // Sempre inicia com a primeira página e limite padrão

    // Lógica de fetch de produtos com base na categoria
    if (category !== "clean") {
      if (sort === "default") {
        fetchProducts(currentPage, limit, "", category);
      } else {
        fetchProducts(currentPage, limit, sort, category);
      }
    } else {
      // Limpa os filtros e faz a requisição padrão
      fetchProducts(currentPage, limit);

      // Remove o parâmetro da URL ao limpar o filtro
      window.history.pushState({}, "", "/shop");
    }
    setIsFilterOpen(false);
  };

  // Função para alterar o modo de exibição
  const handleViewModeChange = (mode: string) => {
    setViewMode(mode);
  };

  // Função para mudar de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (sort === "default" && categoryFilter === "clean") {
      fetchProducts(pageNumber, limit); // Use pageNumber em vez de currentPage
    } else if (sort === "default") {
      fetchProducts(pageNumber, limit, undefined, categoryFilter); // Use pageNumber
    } else if (categoryFilter === "clean") {
      fetchProducts(pageNumber, limit, sort); // Use pageNumber
    } else {
      fetchProducts(pageNumber, limit, sort, categoryFilter); // Use pageNumber
    }

    scrollToTop();
  };

  // Função para lidar com cliques fora do dropdown
  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsFilterOpen(false); // Fecha o dropdown se o clique for fora
    }
  };

  return (
    <div>
      <Header />

      <div className="banner-shop">
        <h1>Shop</h1>
        <Breadcrumb paths={breadcrumbPaths} isSingleProduct={false} />
      </div>

      <div className="filter-bar-container">
        <div className="filter-bar">
          <div className="filter-left">
            <div className="filter-button" onClick={toggleFilterDropdown}>
              <img src={iconFilter} alt="icon filter" width={25} height={25} />
              <span className="filter-text">Filter</span>
              {isFilterOpen && (
                <div className="filter-dropdown" ref={dropdownRef}>
                  <label>
                    <input
                      type="checkbox"
                      name="categoryFilter"
                      value="1"
                      checked={categoryFilter === "1"}
                      onChange={() => handleCategoryFilter("1")}
                    />
                    Dining Room
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="categoryFilter"
                      value="2"
                      checked={categoryFilter === "2"}
                      onChange={() => handleCategoryFilter("2")}
                    />
                    Living Room
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="categoryFilter"
                      value="3"
                      checked={categoryFilter === "3"}
                      onChange={() => handleCategoryFilter("3")}
                    />
                    Bedroom
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="categoryFilter"
                      value="6"
                      checked={categoryFilter === "6"}
                      onChange={() => handleCategoryFilter("6")}
                    />
                    Sofas
                  </label>
                  <button onClick={() => handleCategoryFilter("clean")}>
                    Limpar Filtros
                  </button>
                </div>
              )}
            </div>

            <img
              className={`grid-list ${viewMode === "grid" ? "active" : ""}`}
              src={iconGrid}
              alt="icon grid"
              width={25}
              height={25}
              onClick={() => handleViewModeChange("grid")}
            />
            <img
              className={`grid-list ${viewMode === "list" ? "active" : ""}`}
              src={iconList}
              alt="icon list"
              width={25}
              height={25}
              onClick={() => handleViewModeChange("list")}
            />

            <span className="show-results">
              Showing {start}–{end} of {listLength} results
            </span>
          </div>

          <div className="filter-right">
            <div className="filter-limit">
              <span className="limit-text">Show</span>
              <input
                className="limit-input"
                type="number"
                value={limit}
                onChange={(e) => handleLimitChange(e)}
                min={16}
              />
            </div>
            <div className="filter-sort">
              <span className="sort-text">Short by</span>
              <select
                className="sort-select"
                name="sort"
                id="sort"
                value={sort}
                onChange={(e) => handleSortChange(e)}
              >
                <option value={"default"} hidden>
                  Default
                </option>
                <option value={"asc"}>Crescente</option>
                <option value={"desc"}>Descrescente</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="shop-products">
          <ProductsContainer
            products={products}
            pageType="shop"
            viewMode={viewMode}
          />

          {/* Exibe a paginação somente se houver pelo menos 16 produtos */}
          {listLength >= 16 && (
            <div className="pagination">
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="prev"
                >
                  Back
                </button>
              )}
              {[...Array(dataProducts.totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              {currentPage < dataProducts.totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="next"
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <PreFooter />
      <Footer />
    </div>
  );
};

export default Shop;
