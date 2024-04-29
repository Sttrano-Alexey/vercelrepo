import React, { useState } from 'react';
import './Catalog.css';
import Footer from '../Footer/Footer'
import catalogData from '../../DATA/catalog.json';

const CatalogMain = ({ isCatalogOpen, setCatalogOpen }) => {
  const categories = React.useMemo(() => catalogData, []); // JSON.parse(catalogData); // в webpack.config.js указан loader "json-loader" => можно использовать imported JSON как есть
  const [selectedCategory, setSelectedCategory] = React.useState(1);
  const [selectedCategoryName, setSelectedCategoryName] = React.useState('Компьютеры, Ноутбуки, Планшеты');
  const [active, setActive] = React.useState(false);

  const handleCategoryHover = (categoryId, categoryName) => {
    setSelectedCategory(categoryId);
    setSelectedCategoryName(categoryName);
  
    const subcategoriesContainer = document.querySelector('.subcategories__container');
    if (subcategoriesContainer) {
      subcategoriesContainer.classList.add('active');
    }
  };

  const handleCategoryLeave = () => {
    if (selectedCategory !== null) {
      return;
    }
    setSelectedCategory(null);
    setSelectedCategoryName('');
  };

  const handleSubcategoryClick = (subcategory) => {
    // Перенаправляем пользователя на страницу с товарами данной подкатегории
    window.location.href = `/products`;
  };

  const handleCloseCatalogButtonClick = () => {
    const subcategoriesContainer = document.querySelector('.subcategories__container');
    if (subcategoriesContainer.classList.contains('active')) {
      subcategoriesContainer.classList.remove('active');
    } else {
          setCatalogOpen(!isCatalogOpen);
          document.querySelector('body').classList.remove('lock')
    }
  };

  return (
    <>
      <div className="catalog">
        <div className="catalog__container container">
          <div className="popup-catalog">
            <div className="catalog-categories">
              <div className="catalog-header-mobile">
                <button
                  className="catalog-close"
                  onClick={handleCloseCatalogButtonClick}
                >
                  <svg
                    width="17"
                    height="20"
                    viewBox="0 0 17 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-4.80825e-07 10L16.5 0.47372L16.5 19.5263L-4.80825e-07 10Z"
                      fill="#D9D9D9"
                    />
                  </svg>
                  назад
                </button>
                <p className="catalog-mobile-title">Каталог</p>
              </div>
              {categories.map((category) => {
                if (category.subcategories) {
                  return (
                    <div
                      key={category.id}
                      className={`category ${
                        selectedCategory === category.id && active && "active"
                      }`}
                      onMouseEnter={() =>
                        handleCategoryHover(category.id, category.name)
                      }
                      onMouseLeave={handleCategoryLeave}
                      onClick={() => {
                        setActive(true);
                        setSelectedCategory(category.id);
                        document.querySelector('.catalog').scrollTo({
                          top: 0,
                          behavior: "smooth"
                        });
                      }}
                    >
                      <span>{category.name}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            {selectedCategory && (
              <div
                className={`subcategories__container ${
                  window.matchMedia("(max-width: 945px)").matches
                    ? active
                      ? "active"
                      : ""
                    : ""
                }`}
              >
                <h3 className="subcategory-title">{selectedCategoryName}</h3>
                <div className="subcategories">
                  {categories
                    .find((category) => category.id === selectedCategory)
                    .subcategories.map((subcategory) => (
                      <div className="subcategory">
                        <p
                          className="sub-title"
                          onClick={(e) => {
                            const brands = e.currentTarget.nextElementSibling;
                            if (
                              window.matchMedia("(max-width: 945px)").matches
                            ) {
                              brands.classList.toggle("active");
                            }
                          }}
                        >
                          {subcategory.name}
                        </p>
                        <div className="brands">
                          {subcategory.brands.map((brand) => (
                            <span
                              onClick={() =>
                                handleSubcategoryClick(subcategory)
                              }
                              key={brand.id}
                              className={
                                window.matchMedia("(max-width: 945px)").matches
                                  ? brand.isVisible &&
                                    brand.classList.contains("active")
                                    ? "visible"
                                    : ""
                                  : brand.isVisible && "visible"
                              }
                            >
                              {brand.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default CatalogMain;


