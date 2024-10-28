import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Tabs from "../../components/tabs/tabs";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import { ProductProps } from "../../interfaces/products";
import { GET_CATEGORY, GET_PRODUCT, GET_PRODUCTS } from "../../config/endpoints";
import { productsMock } from "../../components/products/mockData";
import "./single-product.css"
import ProductsContainer from "../../components/products/products";
import iconFacebook from "../../assets/icons/icon-facebook.svg";
import iconLinkedin from "../../assets/icons/icon-linkedin.svg";
import iconTwitter from "../../assets/icons/icon-twitter.svg";
import { CategoryProps } from "../../interfaces/category";
import Spinner from "../../components/spinner/spinner";

const SingleProduct: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductProps | any>({});
  const [category, setCategory] = useState<CategoryProps | any>({});
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  // Estado para armazenar a imagem selecionada
  const [selectedImage, setSelectedImage] = useState(product.image_link);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [limit, setLimit] = useState(4);
  const [clickCount, setClickCount] = useState(0);

  // Fazendo a requisição para o endpoint
  const fetchProducts = async (limitShow: number, categoryId: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        GET_PRODUCTS + `?page=1&limit=${limitShow}&categoryId=` + categoryId
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

  useEffect(() => {
    // Fazendo a requisição para o endpoint pelo ID da categoria
    const fetchCategory = async (id: number) => {
      setLoading(true);
      try {
        const categoryId = id;
        const url = GET_CATEGORY.replace("{id}", `${categoryId}`);
        const response = await fetch(url); 
        const dataCategory = await response.json();
        setCategory(dataCategory);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
        setLoading(false); 
      }
    };

    // Fazendo a requisição para o endpoint pelo ID do produto
    const fetchProduct = async () => {
      setLoading(true);
      const url = GET_PRODUCT.replace("{id}", `${id}`);

      try {
        const response = await fetch(url); // Substitua pela URL real do seu endpoint
        const data = await response.json(); // Supondo que a resposta esteja em formato JSON
        setProduct(data); // Atualiza o estado com os produtos
        setSelectedImage(data.image_link);
        setTimeout(() => {
          fetchCategory(data.category_id);
          fetchProducts(limit, data.category_id); // Chama a função para buscar os produtos relacionados
          setLoading(false); // Define que o carregamento foi concluído
        }, 3000);
      } catch (error) {
        console.error("Erro ao buscar produto pelo ID:", error);
        setLoading(false); // Em caso de erro, para o carregamento
      }
    };

    // Chama a função ao montar o componente
    fetchProduct();

    scrollToTop();
  }, [id]);

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
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
  
    if (newClickCount === 1) {
      // Primeiro clique: busca a segunda página de produtos
      const nextPage = limit + 4;
      setLimit(nextPage);
      fetchProducts(nextPage, product.category_id);
    } else if (newClickCount === 2) {
      // Segundo clique: redireciona para a página "Shop" com os produtos relacionados
      window.location.href = `/shop?category=${product?.category_id || 1}`;
    }
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
                {product.reviews &&
                  generateStarsRating(
                    product.reviews.rating || 0,
                    true,
                    product.reviews.total_reviews || 0
                  )}
              </div>
            </div>
            <p className="description">{product.description || ""}</p>

            <div className="product-options">
              <span>Size</span>
              <div className="size-options">
                {product.variants?.size?.map((size: any) => (
                  <button
                    key={size}
                    className={
                      selectedSize === size ? "size-btn active" : "size-btn"
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="color-container">
                <span>Color</span>
                <div className="color-options">
                  {product.variants?.color?.map((color: any) => (
                    <button
                      key={color}
                      className={
                        selectedColor === color ? "color active" : "color"
                      }
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor: color,
                        borderColor: selectedColor === color ? "#000" : color,
                      }}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            <div className="add-to-cart-container">
              <div className="quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
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
              <p className="meta-sku">
                <span className="meta-title">SKU</span>{" "}
                <span>: {product.sku || ""}</span>
              </p>
              <p className="meta-category">
                <span className="meta-title">Category</span>{" "}
                <span>: {category.name || ""}</span>
              </p>
              <p className="meta-tags">
                <span className="meta-title">Tags</span>{" "}
                <span>: {product.tags || ""}</span>
              </p>

                <p className="meta-share">
                  <span className="meta-title share-title">Share</span>
                  <span className="share-icons">: 
                    <i className="icon-facebook" style={{ cursor: "pointer" }}>
                      <img
                        src={iconFacebook}
                        alt="Facebook"
                        onClick={shareOnFacebook}
                        width={20}
                        height={20}
                      />
                    </i>
                    <i className="icon-linkedin" style={{ cursor: "pointer" }}>
                      <img
                        src={iconLinkedin}
                        alt="LinkedIn"
                        onClick={shareOnLinkedIn}
                        width={20}
                        height={20}
                      />
                    </i>
                    <i className="icon-twitter" style={{ cursor: "pointer" }}>
                      <img 
                        src={iconTwitter} 
                        alt="Twitter" 
                        onClick={shareOnTwitter} 
                        width={20}
                        height={20}
                      />
                    </i>
                  </span>
                </p>
            </div>
          </div>
        </div>
      </div>

      <div className="tabs-description">
        <Tabs
          description={product.large_description || ""}
          additional={product.additional_information || ""}
        />
      </div>

      <div className="single-products-container">
        <div className="single-products">
          <h1 className="single-products-text">Related Products</h1>
          {loading ? <Spinner /> : <ProductsContainer products={products} pageType="single" />}
          <button className="single-products-button" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SingleProduct;