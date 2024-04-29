import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/products.css'
import startFill from '../components/Images/Products/star_fill.svg'
import startNone from '../components/Images/Products/star_none.svg'

const Product = ({ product }) => {

  const [isInCart, setIsInCart] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    // Проверяем, есть ли товар уже в корзине при загрузке компонента
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isItemInCart = existingCart.find((item) => item.id === product.id);
    setIsInCart(!!isItemInCart);
    if (isItemInCart) setCount(isItemInCart.count);
  }, [product.id]);

  const addToCart = () => {
    // Получаем текущий список товаров в корзине из localStorage
    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Проверяем, есть ли идентификатор товара уже в корзине
    const isItemInCart = existingCart.find((item) => item.id === product.id);

    // Если товар уже в корзине, обновляем его количество
    if (isItemInCart) {
      existingCart = existingCart.map((item) => {
        if (item.id === product.id) {
          return { ...item, count: count }
        }
        return item;
      });

      // Сохраняем обновленный список товаров в localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));
    } else {
      // Добавляем айди товара и количество в корзину
      const newCart = [...existingCart, { id: product.id, count: count }];

      // Сохраняем обновленный список товаров в localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    setIsInCart(true);
  };

  const handlePlus = () => {
    setCount((prev) => prev + 1);
    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemInCart = existingCart.find((item) => item.id === product.id);
    if (itemInCart) {
      existingCart = existingCart.map((item) => {
        if (item.id === product.id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    } else {
      existingCart = [...existingCart, { id: product.id, count: 1 }];
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };


  const handleMinus = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
      let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      existingCart = existingCart.map((item) => {
        if (item.id === product.id) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(existingCart));
    } else {
      let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      existingCart = existingCart.filter((item) => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      setIsInCart(false);
    }
  };



  
  return (
      <>
        <div className="product__item">
          <div className="products__slider-item">
            <img src={product.img1} alt="" />
          </div>
          <span className="product__price">{product.price} ₽</span>
          <Link  title={product.title} to={`/info_products/${product.id}`} className="products__titles">
            {product.title.length > 25
              ? product.title.slice(0, 25) + '...'
              : product.title
            }
          </Link>
          <span className="product__article">(арт .{product.article})</span>
          <p className="product-item-descriptions">{product.description}</p>
          <div className="product__rate">
            <div className="product__stars">
              <img src={startFill} alt="" />
              <img src={startFill} alt="" />
              <img src={startFill} alt="" />
              <img src={startFill} alt="" />
              <img src={startNone} alt="" />
            </div>
            <span>4.0</span>
          </div>
          <span className="products__aviability">В наличии</span>
          {isInCart ? (
            <div className="added-to-cart">
              <button className=" product__add-to-cart-btn product__added-to-cart-btn">В корзине</button>
              <div className="product-item-count">
                <button className="count_btn" onClick={handleMinus} >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="8" fill="#D9D9D9"/>
                      <path d="M13 8L3 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <span className="count-content">{count}</span>
                <button className="count_btn" onClick={handlePlus}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="8" fill="#C91111"/>
                      <path d="M8 3L8 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M13 8L3 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <button className="product__add-to-cart-btn" onClick={() => addToCart()}>В корзину</button>
          )}
        </div>
      </>
  );
};

export default Product;

