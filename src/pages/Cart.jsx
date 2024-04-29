import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import '../styles/cart.css'
import CartForm from "../components/CartForm/CartForm";

export default function Cart(){

     const fetchProductById = async (productId) => {
        try {
            // Загрузка данных из файла products.json
            const response = await fetch('../src/DATA/products.json');
            if (!response.ok) {
                throw new Error('Не удалось загрузить продукты');
            }
    
            const productsData = await response.json();
            // Возврат данных о продукте по его идентификатору
            return productsData[productId];
        } catch (error) {
            console.error('Ошибка при загрузке продуктов:', error);
            return null; // или обработка ошибки по вашему усмотрению
        }
    };


    // Состояние для списка товаров в корзине
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        // Загружаем данные о каждом товаре из корзины
        const loadCartItems = async () => {
            const cartData = JSON.parse(localStorage.getItem("cart")) || [];
            const itemsWithData = await Promise.all(cartData.map(async (item) => {
                const productData = await fetchProductById(item.id - 1);
                if (productData) {
                    return { ...productData, count: item.count };
                }
                return null;
            }));
            setCartItems(itemsWithData.filter(item => item));
        };
    
        loadCartItems();
    }, []);

    const removeFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1); // Удаляем товар из массива
        setCartItems(updatedCartItems); // Обновляем состояние корзины
        localStorage.setItem("cart", JSON.stringify(updatedCartItems.map(item => item.id))); // Обновляем localStorage
    };

    const clearCart = () => {
        setCartItems([]); // Очищаем корзину
        localStorage.removeItem("cart"); // Удаляем корзину из localStorage
    };

    const totalSum = cartItems.reduce((sum, item) => sum + (item.price.replace(/ /g, '') * 1) * item.count, 0);


    return(
        <>
        <Header></Header>
        <section className="cart">
            <div className="cart__container container">
                <div className="cart__mainRow">
                    <div className="mobile-cart-header">
                        <button className="back-from-cart" onClick={() => window.history.back()}>
                            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M-4.80825e-07 10L16.5 0.47372L16.5 19.5263L-4.80825e-07 10Z" fill="#D9D9D9"/>
                            </svg>
                            назад
                        </button>
                        <p>Корзина</p>
                        <button className="cart-clear-mobile" onClick={clearCart}>
                            <svg width="38" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="37" height="31" rx="3.5" fill="white"/>
                                <rect x="0.5" y="0.5" width="37" height="31" rx="3.5" stroke="#D4D4D4"/>
                                <path d="M26.4295 11.5L24.9859 25.1055C24.932 25.6141 24.503 26 23.9915 26H13.4828C12.9714 26 12.5424 25.6141 12.4884 25.1055L11.0449 11.5M14.7684 14.0016L14.9864 20.9982M18.4676 14.5V21.5M22.1669 14.0016L21.9493 20.9982M18.4808 6.5C17.0008 6.5 15.7951 7.6032 15.6654 9H19.5064C19.6445 9 19.7564 9.11193 19.7564 9.25C19.7564 9.38807 19.6445 9.5 19.5064 9.5H9.25C9.11193 9.5 9 9.38807 9 9.25C9 9.11193 9.11193 9 9.25 9H15.1635C15.2943 7.3169 16.7349 6 18.4808 6C20.2266 6 21.6672 7.3169 21.798 9H28.2244C28.3624 9 28.4744 9.11193 28.4744 9.25C28.4744 9.38807 28.3624 9.5 28.2244 9.5H21.5577C21.4196 9.5 21.3077 9.38807 21.3077 9.25C21.3077 7.73715 20.048 6.5 18.4808 6.5Z" stroke="#757575" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="cart__mainColumn">
                        <table className="cart-table">
                            <tbody>
                                <tr className="cart-title-row">
                                    <th className="cart-title">Корзина <span>{cartItems.length} товара</span></th>
                                    <th className="cart-puncts">Артикль</th>
                                    <th className="cart-puncts">Кол-во</th>
                                    <th className="cart-puncts">1 товар</th>
                                    <th className="cart-puncts">x-товар</th>
                                    <th className="last-column clear-cart" onClick={clearCart}>Очистить корзину</th>
                                </tr>
                                {window.innerWidth >= 890 ? (
                                    cartItems.map((item, index) => (
                                        <tr className="item-in-cart" key={item.id}>
                                            <td className="item-cart-title">
                                                <div>
                                                    <img className="item-cart-img" src={item.img1} alt="Ноутбук CBR" />
                                                    <span className="item-cart-title-text">{item.title} </span>
                                                </div>
                                            </td>
                                            <td className="item-cart-article">(арт. {item.article})</td>
                                            <td className="count">
                                                <button className="count_btn" data-action="minus" >
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="8" cy="8" r="8" fill="#D9D9D9"/>
                                                        <path d="M13 8L3 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                    </svg>
                                                </button>
                                                <span className="count-content">{item.count}</span>
                                                <button className="count_btn" data-action="plus">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="8" cy="8" r="8" fill="#C91111"/>
                                                        <path d="M8 3L8 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                        <path d="M13 8L3 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                    </svg>
                                                </button>
                                            </td>
                                            <td className="item-cart-price">{item.price} ₽</td>
                                            <td className="item-cart-price x-summ">
                                                {new Intl.NumberFormat('ru-RU').format(item.price.replace(/ /g, '') * item.count)} ₽
                                            </td>
                                            <td className="delete__cart-td" onClick={() => removeFromCart(index)}>
                                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                </svg>
                                                <span>
                                                    удалить
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    cartItems.map((item, index) => (
                                    <div className="mobile-item-in-cart" key={item.id}>
                                        <div className="mob-item-article">
                                            (арт. {item.article})
                                        </div>
                                        <div className="mob-item-img">
                                            <img className="item-cart-img" src={item.img1} alt="Ноутбук CBR" />
                                        </div>
                                        <div className="mob-item-title">
                                            {item.title}
                                        </div>
                                        <div className="mob-item-count">
                                            <button className="count_btn" data-action="minus" >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="8" cy="8" r="8" fill="#D9D9D9"/>
                                                    <path d="M13 8L3 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </button>
                                            <span className="count-content">{item.count}</span>
                                            <button className="count_btn" data-action="plus">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="8" cy="8" r="8" fill="#C91111"/>
                                                    <path d="M8 3L8 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                    <path d="M13 8L3 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className=" mob-item-price mob-item-price-fix">
                                            {item.price} ₽
                                        </div>
                                        <div className="mob-item-price">
                                            {new Intl.NumberFormat('ru-RU').format(item.price.replace(/ /g, '') * item.count)} ₽
                                        </div>
                                        <div className="mob-item-delete" onClick={() => removeFromCart(index)}>
                                        <svg width="38" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="37" height="31" rx="3.5" fill="white"/>
                                            <rect x="0.5" y="0.5" width="37" height="31" rx="3.5" stroke="#D4D4D4"/>
                                            <path d="M26.4295 11.5L24.9859 25.1055C24.932 25.6141 24.503 26 23.9915 26H13.4828C12.9714 26 12.5424 25.6141 12.4884 25.1055L11.0449 11.5M14.7684 14.0016L14.9864 20.9982M18.4676 14.5V21.5M22.1669 14.0016L21.9493 20.9982M18.4808 6.5C17.0008 6.5 15.7951 7.6032 15.6654 9H19.5064C19.6445 9 19.7564 9.11193 19.7564 9.25C19.7564 9.38807 19.6445 9.5 19.5064 9.5H9.25C9.11193 9.5 9 9.38807 9 9.25C9 9.11193 9.11193 9 9.25 9H15.1635C15.2943 7.3169 16.7349 6 18.4808 6C20.2266 6 21.6672 7.3169 21.798 9H28.2244C28.3624 9 28.4744 9.11193 28.4744 9.25C28.4744 9.38807 28.3624 9.5 28.2244 9.5H21.5577C21.4196 9.5 21.3077 9.38807 21.3077 9.25C21.3077 7.73715 20.048 6.5 18.4808 6.5Z" stroke="#757575" stroke-linecap="round"/>
                                        </svg>
                                        </div>
                                    </div>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {cartItems.length === 0 ? (
                            <div className="empty-cart-message">
                                <p>Ваша корзина пуста, но это легко исправить!</p>
                                <button onClick={() => {window.location.href ='/products'}}>
                                    Перейти к покупкам
                                </button>
                            </div>
                        ): <CartForm></CartForm>}
                    </div>
                    {cartItems.length === 0 ? (
                        <></>
                        ):
                        <div className="cart__mainColumn">
                            <div className="order-item-container">
                                <div className="order__items">
                                    <div className="order__item"><span>{cartItems.length} товара</span><span>{new Intl.NumberFormat('ru-RU').format(totalSum)} ₽</span></div>
                                    <div className="order__item"><span>Доставка</span><span>СДЭК</span></div>
                                    <div className="order__item-main"><p>К оплате:</p> <span className="total-sum">{new Intl.NumberFormat('ru-RU').format(totalSum)} ₽</span></div>
                                </div>
                                <button className="order-btn">Оформить заказ</button>
                                <p className="order-confirmation">
                                    Нажимая на кнопку "Оформить" Вы подтверждаете своё согласие на обработку персональных данных.
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
        <Footer></Footer>
        </>
    )
}
