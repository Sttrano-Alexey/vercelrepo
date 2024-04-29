import React, { useState, useEffect } from "react";
import Product from "./Product";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProductHeader from "../components/ProductsHeader/ProductsHeader";
import { useMemo } from "react";
import ToUp from "../components/toUp/ToUp";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(6); // количество видимых продуктов
  const [brands, setBrands] = useState([]); // бренды
  const [categories, setCategories] = useState([]); // категории

  const [priceFilterFrom, setPriceFilterFrom] = useState(0); // минимальная цена
  const [priceFilterTo, setPriceFilterTo] = useState(0); // максимальная цена
  const [selectedBrands, setSelectedBrands] = useState([]); // выбранные бренды
  const [selectedCategories, setSelectedCategories] = useState([]); // выбранные категории

  useEffect(() => {
    fetch("./DATA/products.json")
      .then((res) => res.json())
      .then((products) => {
        // Получаем уникальные категории и бренды
        const uniqueCategories = [...new Set(products.map((product) => product.category))];
        const uniqueBrands = [...new Set(products.map((product) => product.brand))];
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
        setProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    let filteredProducts = products;

    if (selectedCategories.length > 0 && selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category) && selectedBrands.includes(product.brand)
      );
    } else if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    } else if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (priceFilterFrom !== 0 && priceFilterTo !== 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= priceFilterFrom && product.price <= priceFilterTo
      );
    }

    return filteredProducts;
  }, [products, selectedBrands, selectedCategories, priceFilterFrom, priceFilterTo]);

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
  };

  const hideAllProducts = () => {
    setVisibleProducts(6); // Устанавливаем количество видимых продуктов обратно в 6
  };

  const applyPriceFilter = () => {
    setVisibleProducts(6); // Сбрасываем количество видимых продуктов
  };

  const applyBrandFilter = () => {
    setVisibleProducts(6); // Сбрасываем количество видимых продуктов
  };

  const applyCategoryFilter = () => {
    setVisibleProducts(6); // Сбрасываем количество видимых продуктов
  };

  return (
    <>
      <Header></Header>
      <section className="products">
        <div className="products__container container">
          <ProductHeader></ProductHeader>
          <div className="products__row">
            <div className="products__filter">
              <div className="filter-item">
                <button onClick={() => setPriceFilterFrom(0)} className="filter-button">
                  Цена
                  <svg id="tabs__arrow" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.76314 0.736862L9.01314 5.5L0.76314 10.2631L0.76314 0.736862Z" fill="#000"></path>
                  </svg>
                </button>
                <div className="price-filter">
                  <div>
                    <input
                      type="number"
                      placeholder="От"
                      value={priceFilterFrom}
                      onChange={(e) => setPriceFilterFrom(+e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="До"
                      value={priceFilterTo}
                      onChange={(e) => setPriceFilterTo(+e.target.value)}
                    />
                  </div>
                  <input className="filter-range"
                    type="range"
                    min={0}
                    max={100000}
                    step={1000}
                    value={priceFilterTo}
                    onChange={(e) => setPriceFilterTo(+e.target.value)}
                  />
                </div>
              </div>
              <div className="filter-item">
                <button onClick={() => {}} className="filter-button">
                  Бренд
                  <svg id="tabs__arrow" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.76314 0.736862L9.01314 5.5L0.76314 10.2631L0.76314 0.736862Z" fill="#000"></path>
                  </svg>
                </button>
                <div className="brand-filter">
                  {brands.map((brand) => (
                    <label key={brand} style={{
                      display: "flex",
                      alignItems: "center",
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, brand]);
                          } else {
                            setSelectedBrands(
                              selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
                            );
                          }
                        }}
                        style={{
                          marginRight: 5,
                        }}
                      />
                      <span
                        style={{
                          color: selectedBrands.includes(brand) ? "#CE3E28" : "inherit",
                        }}
                      >
                        {brand}
                      </span>
                    </label>

                  ))}
                </div>
              </div>
              <div className="filter-item">
                <button onClick={() => {}} className="filter-button">
                  Категории
                  <svg id="tabs__arrow" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.76314 0.736862L9.01314 5.5L0.76314 10.2631L0.76314 0.736862Z" fill="#000"></path>
                  </svg>
                </button>
                <div className="category-filter">
                  {categories.map((category) => (
                    <label key={category} style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter((selectedCategory) => selectedCategory !== category)
                            );
                          }
                        }}
                        style={{ marginRight: 5 }}
                      />
                      <span
                        style={{
                          color: selectedCategories.includes(category) ? "#CE3E28" : "inherit",
                        }}
                      >
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {
              filteredProducts.length === 0 && (
                <div className="not-found">
                  <span>Не найдено по фильтру, попробуйте другие значения</span>
                </div>
              )
            }
            {filteredProducts.length > 0 && (
              <div className="product-list">
                {filteredProducts
                  .slice(0, visibleProducts)
                  .map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
                {
                  (filteredProducts.length > visibleProducts || visibleProducts < 7) &&
                  visibleProducts < filteredProducts.length && (
                    <button
                      className={`show-more-products-btn${filteredProducts.length <= 7 ? ' hidden' : ''}`}
                      onClick={loadMoreProducts}
                    >
                      Показать еще
                    </button>
                  )
                }
                {
                  visibleProducts >= filteredProducts.length && (
                    <button
                      className={`show-more-products-btn${filteredProducts.length <= 7 ? ' hidden' : ''}`}
                      onClick={hideAllProducts}
                    >
                      Скрыть
                    </button>
                  )
                }
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer></Footer>
      <ToUp></ToUp>
    </>
  );
};

export default ProductList;

