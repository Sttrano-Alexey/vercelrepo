import '../styles/ProductsInfo.css'
import Header from '../components/Header/Header'
import startFill from '../components/Images/Products/star_fill.svg'
import startNone from '../components/Images/Products/star_none.svg'
import img from '../components/Images/Products/products-slide.jpg'


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from '../components/Footer/Footer'
import FastOrderMobile from '../components/FastOrderMobile/FastOrderMobile'

export default function ProductsInfo(){

    const { productId } = useParams();
    const [productInfo, setProductInfo] = useState(null);
    const [count, setCount] = useState(1);
    const [isInCart, setInCart] = useState(false);
    const [isOrderOpen, setOrderOpen] = useState(false)

    const handleOrderClose = () => {
        setOrderOpen(false)
    }


    useEffect(() => {
        // Чтение файла products.json
        fetch('https://raw.githubusercontent.com/Sttrano-Alexey/vercelrepo/main/src/DATA/products.json')
            .then((response) => response.json())
            .then((data) => {
                const product = data.find((item) => item.id === parseInt(productId)); // Парсим productId к числу, если необходимо
                setProductInfo(product);
            })
            .catch((error) => {
                console.error('Ошибка при чтении файла products.json:', error);
            });

        let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        setInCart(existingCart.find((item) => item.id === productId) !== undefined);

    }, [productId]); // Зависимость только от productId

    if (!productInfo) {
        return <div className='load'>Loading...</div>;
    }

    const getCountFromLocalStorage = () => {
        let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemInCart = existingCart.find((item) => item.id === productInfo.id);
        if (itemInCart) {
            return itemInCart.count;
        } else {
            return count;
        }
    };

    const handlePlus = () => {
        let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemInCart = existingCart.find((item) => item.id === productInfo.id);
        if (itemInCart) {
            existingCart = existingCart.map((item) => {
                if (item.id === productInfo.id) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
        } else {
            existingCart = [...existingCart, { id: productInfo.id, count: 1 }];
        }
        localStorage.setItem("cart", JSON.stringify(existingCart));
        setCount(getCountFromLocalStorage());
        setInCart(true);
    };

    const handleMinus = () => {
        let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemInCart = existingCart.find((item) => item.id === productInfo.id);
        if (itemInCart && itemInCart.count > 1) {
            existingCart = existingCart.map((item) => {
                if (item.id === productInfo.id) {
                    return { ...item, count: item.count - 1 };
                }
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(existingCart));
            setCount(getCountFromLocalStorage());
        } else {
            existingCart = existingCart.filter((item) => item.id !== productInfo.id);
            localStorage.setItem("cart", JSON.stringify(existingCart));
            setCount(0);
            setInCart(false);
        }
    };


    const addToCart = () => {
        let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemInCart = existingCart.find((item) => item.id - 1 === productInfo.id);
        if (itemInCart) {
            existingCart = existingCart.map((item) => {
                if (item.id - 1 === productInfo.id) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
        } else {
            existingCart = [...existingCart, { id: productInfo.id - 1, count: 1 }];
        }
        localStorage.setItem("cart", JSON.stringify(existingCart));
        setCount(getCountFromLocalStorage());
        setInCart(true);
    }


    return(
        <>
            <Header></Header>
            <section className='productsInfo'>
                <div className="productsInfo__container container">
                    <div className="productsInfo__header">
                        <button className='catalog-close info' onClick={() => window.history.back()}>
                            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M-4.80825e-07 10L16.5 0.47372L16.5 19.5263L-4.80825e-07 10Z" fill="#D9D9D9"/>
                            </svg>
                            назад
                        </button>
                        <a href="">Каталог/</a><a href="">Компьютеры/</a><a href="">Apple/</a><a href="">{productInfo.title}</a>
                    </div>
                    <div className="productsInfo__row">
                        <div className="productsInfo__column">
                            <div className='productsInfo__info'>
                                <p className='productsInfo__title'>{productInfo.title}</p>
                                <p className='productsInfo__article'>(арт. {productInfo.article})</p>
                                <div className="product__rate info">
                                    <div className="product__stars">
                                        <img src={startFill} alt="" />
                                        <img src={startFill} alt="" />
                                        <img src={startFill} alt="" />
                                        <img src={startFill} alt="" />
                                        <img src={startNone} alt="" />
                                    </div>
                                    <span>4.0</span>
                                </div>
                                <span className="products__aviability info">В наличии</span>
                            </div>
                            <div className="products__info-slider">
                                <div className="products__info-slider-navigation">
                                    <img className='productsInfo__img-slide' src={img} alt="" />
                                    <img className='productsInfo__img-slide' src={img} alt="" />
                                    <img className='productsInfo__img-slide' src={img} alt="" />
                                </div>
                                <img className='productsInfo__img' src={img} alt="" />
                            </div>
                            <span className='productsInfo__descTitle'>Характеристика</span>
                            <p className='productsInfo__desc'>
                            {productInfo.characteristic}
                            </p>
                        </div>
                        <div className="productsInfo__column">
                            <div className="info-add-to-cart">
                                <div className="add-to-cart-container">
                                    <div className="product-info-count">
                                        <button className="count_btn" onClick={handleMinus}>
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
                                    <div className="info-item-price">
                                        {(productInfo.price.replace(/\s/g, '') * count).toLocaleString('ru') } <span> ₽</span>
                                    </div>
                                </div>
                                <div className="info-add-to-cart-buttons">
                                    {isInCart
                                        ? <button className='info-btn in-cart'>в корзине</button>
                                        : <button className='info-btn' onClick={addToCart}>в корзину</button>
                                    }
                                    <button className='info-btn order' onClick={() => {setOrderOpen(true)}}>быстрый заказ</button>      
                                </div>                                
                            </div>
                            <div className='info-column-delivery-info'>
                                <p className='info-column-title'>Расчитать стоимость доставки</p>
                                <div className="info-delivery">
                                    <div><p className='info-delivery-text'>Доставка</p><span className='info-delivery-text'>СДЭК</span></div>
                                    <div><p className='info-delivery-text'>Город</p><input className='info-input-city' type="text" placeholder='Москва, Пожарская 25'/></div>
                                </div>
                                <p className='info-column-title'>Выбрать Пункт выдачи</p>
                                <div className="info-map"></div>
                                <div className='info-delivery-courier'><p className='info-delivery-text'>Курьером</p><input className='info-input-city' type="text" placeholder='Москва, Пожарская 25'/></div>
                                <div className='info-delivery-courier-price'><p className='info-delivery-text'>Стоимость доставки</p><span className='info-delivery-text'>340 р</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                {isOrderOpen && <FastOrderMobile onClose={handleOrderClose}></FastOrderMobile>}
            </section>
            <Footer></Footer>
        </>
    )
}
