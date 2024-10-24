import React, { useEffect, useState } from "react";
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

const Shop: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]); // Estado para armazenar os produtos
  const [dataProducts, setDataProducts] = useState<any>({}); // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [limit, setLimit] = useState(16);
  const [sort, setSort] = useState("default");
  const [listLength, setListLength] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, listLength);

  // Fazendo a requisição para o endpoint
  const fetchProducts = async (
    page: number,
    limit?: number,
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
      setListLength(productsData.totalProducts);
      setLoading(false); // Define que o carregamento foi concluído
    } catch (error) {
      setProducts(productsMock);
      console.error("Erro ao buscar produtos:", error);
      setLoading(false); // Em caso de erro, para o carregamento
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, limit); // Chama a função ao montar o componente
  }, []); // O array vazio [] garante que o efeito será executado apenas uma vez ao montar o componente

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
    if (category === "clean") {
      setCurrentPage(1);
      fetchProducts(1, 16);
    } else {
      if (sort === "default") {
        fetchProducts(currentPage, limit, "", category);
      } else {
        fetchProducts(currentPage, limit, sort, category);
      }
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
                <div className="filter-dropdown">
                  <button onClick={() => handleCategoryFilter("1")}>
                    Dining Room
                  </button>
                  <button onClick={() => handleCategoryFilter("2")}>
                    Living Room
                  </button>
                  <button onClick={() => handleCategoryFilter("3")}>
                    Bedroom
                  </button>
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
        <div>Loading...</div>
      ) : (
        <div className="shop-products">
          <ProductsContainer
            products={products}
            pageType="shop"
            viewMode={viewMode}
          />

          <div className="pagination">
            {currentPage > 1 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>
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
              <button onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            )}
          </div>
        </div>
      )}

      <PreFooter />
      <Footer />
    </div>
  );
};

export default Shop;
