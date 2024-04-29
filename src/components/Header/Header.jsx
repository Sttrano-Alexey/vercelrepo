import './Header.css'
import logo from '../Images/Logo/logo.svg'
import search from '../Images/Icons/search.svg'
import CatalogMain from '../Catalog/CatalogMain'
import React, { useState } from 'react'
import { useEffect } from 'react'
import MobileSearch from '../MobileSearch/MobileSearch'

export default function Header(){

    const [isCatalogOpen, setCatalogOpen] = useState(false)

    const [isSearchOpen, setSearchOpen] = useState(false)

    const searchOpen = (event) => {
        if (window.innerWidth < 946) {
            event.preventDefault();
        }
        setSearchOpen(!isSearchOpen)
    }


    const openCatalog = () => {
        const body = document.body;
        isCatalogOpen ? body.classList.remove('lock') : body.classList.add('lock');
        setCatalogOpen(!isCatalogOpen);
    }


    
        const goToCartPage = () => {
            const currentUrl = window.location.href;
            const previousUrl = localStorage.getItem('previousUrl');
            window.location.href = currentUrl.includes('cart') ? previousUrl || '/' : '/cart';
            localStorage.setItem('previousUrl', currentUrl);
        }


        const [cartLength, setCartLength] = useState(JSON.parse(localStorage.getItem('cart') || '[]').length);

        useEffect(() => {
          // Отслеживание изменений в local storage
          const cartStorageListener = (event) => {
            if (event.key === 'cart') {
              // Обновление состояния с длиной массива
              setCartLength(JSON.parse(event.newValue).length);
            }
          };
          window.addEventListener('storage', cartStorageListener);

          return () => {
            window.removeEventListener('storage', cartStorageListener);
          };
        }, [localStorage.getItem('cart')]);


    return(
    <>
    <header className="header">
        <div className="header__container container">
            <a href="/" className="header__logo">
                <img className="header__logo-img" src={logo} alt=""/>
            </a>
            <nav className="header__menu">
                <ul className="header__menu-list">
                    <li className="header__menu-item"><a href="delivery" className="header__menu-link">Доставка</a></li>
                    <li className="header__menu-item"><a href="person.html" className="header__menu-link">Юр. Лицам</a></li>
                    <li className="header__menu-item"><a href="payment.html" className="header__menu-link">Оплата</a></li>
                    <li className="header__menu-item"><a href="safeguard.html" className="header__menu-link">Гарантия</a></li>
                    <li className="header__menu-item"><a href="about.html" className="header__menu-link">О нас</a></li>
                    <li className="header__menu-item"><a href="contacts.html" className="header__menu-link">Контакты</a></li>
                </ul>
            </nav>
            <div className="header__contact">
                <p className="header__contact-time" href="#">10:00 - 19:00</p>
                <a className="header__contact-email" href="mailto:1@TECHPRO.RU">1@TECHPRO.RU</a>
                <a className="header__contact-phone" href="tel:8-910-00-00">8-910-00-00</a>
            </div>
            <button id="catalog_open" className="header__button" onClick={openCatalog}>
                Каталог
            </button>
            <div className="header__search">
                <form className="header__search-form" action="/search" method="get">
                    <input className="header__search-input" type="text" placeholder="Искать товары" name="search"/>
                    <input className="header__search-icon" type="image" src={search} onClick={searchOpen} alt="Поиск" />
                </form>
                <button className={`header__shop ${window.location.pathname === '/cart' ? 'shop-cart-icon' : ''}`} onClick={goToCartPage}>
                <p className='cart-lenght'>{cartLength}</p>
                <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.990291 0C0.443368 0 0 0.447715 0 1C0 1.55228 0.443368 2 0.990291 2H3.52872C3.97529 2 4.36662 2.30182 4.48412 2.73688L8.94185 19.2421C8.96061 19.3183 8.98802 19.391 9.02297 19.4592C9.09126 19.593 9.18736 19.7066 9.30178 19.7947C9.41607 19.883 9.54997 19.9468 9.69573 19.9781C9.77002 19.9942 9.8467 20.0018 9.92441 20H24.2848C25.589 20 26.7407 19.141 27.1243 17.8823L29.8666 8.88226C30.4544 6.9531 29.0259 5 27.0271 5H9.90291C9.35599 5 8.91262 5.44772 8.91262 6C8.91262 6.55228 9.35599 7 9.90291 7H27.0271C27.6934 7 28.1695 7.65103 27.9736 8.29409L25.2313 17.2941C25.1034 17.7137 24.7195 18 24.2848 18H12.1721C11.2789 18 10.4963 17.3964 10.2613 16.5262L6.39491 2.21065C6.04241 0.905465 4.86844 0 3.52872 0H0.990291Z" fill="#1E1E1E"/>
                    <path d="M14.0097 24.0003C14.0097 25.1048 13.123 26.0003 12.0291 26.0003C10.9353 26.0003 10.0485 25.1048 10.0485 24.0003C10.0485 22.8957 10.9353 22.0003 12.0291 22.0003C13.123 22.0003 14.0097 22.8957 14.0097 24.0003Z" fill="#1E1E1E"/>
                    <path d="M22.9223 24.0003C22.9223 25.1048 22.0356 26.0003 20.9417 26.0003C19.8479 26.0003 18.9612 25.1048 18.9612 24.0003C18.9612 22.8957 19.8479 22.0003 20.9417 22.0003C22.0356 22.0003 22.9223 22.8957 22.9223 24.0003Z" fill="#1E1E1E"/>
                </svg>

                </button>
            </div>
        </div>
        <div className="header__mobile-search">
            <div className="header__mobile-container">
                <span className="header__mobile-title">
                    Поиск товара
                </span>
                <form action="/search" method="get" className="header__mobile-form">
                    <input className="header__mobile-input" type="text" placeholder="Артикул, категория, бренд, модель..." name="search" />
                    <button className="header__mobile-button">Искать в каталоге</button>
                </form>
            </div>
        </div>
    </header>
    {window.innerWidth < 945 && isSearchOpen && <MobileSearch onClick={searchOpen}></MobileSearch>}
    {isCatalogOpen && <CatalogMain isCatalogOpen={isCatalogOpen} setCatalogOpen={setCatalogOpen}></CatalogMain>}
    </>
    )
}
