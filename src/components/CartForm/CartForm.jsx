import "./CartForm.css";
import React, { useRef, useState } from "react";

export default function CartForm() {
  const [isPhysicalLegal, setIsPhysicalLegal] = useState(true);

  const handlePhizCheckboxChange = () => {
    setIsPhysicalLegal(true);
  };

  const handleLegalCheckboxChange = () => {
    setIsPhysicalLegal(false);
  };
  
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const forms = [
    <div key="phiz-form">
      <h3 className="form-title">Оформление заказа</h3>
      <div  className="form-row">
      <form className="form-form phiz-form-column">
      <span className="form-subtitle">
        Физическое лицо{" "}
        <input
          type="checkbox"
          className="form-checkbox"
          onChange={handlePhizCheckboxChange}
          checked={isPhysicalLegal}
        />
      </span>
      <label className="form-label" htmlFor="phiz-form-checkbox">
        ФИО
      </label>
      <input
        type="text"
        className="form-input"
        placeholder="Введите имя"
        disabled={!isPhysicalLegal}
      />
      <label className="form-label" htmlFor="phiz-form-checkbox">
        Почта
      </label>
      <input
        type="email"
        className="form-input"
        placeholder="name@example.com"
        disabled={!isPhysicalLegal}
      />
      <label className="form-label" htmlFor="phiz-form-checkbox">
        Телефон
      </label>
      <input
        type="tel"
        className="form-input"
        placeholder="+7 123 456 78 90"
        disabled={!isPhysicalLegal}
      />
    </form>
    <form className="form-form legal-form-column">
    <span className="form-subtitle">
      Юридическое лицо{" "}
      <input
        type="checkbox"
        className="form-checkbox"
        onChange={handleLegalCheckboxChange}
        checked={!isPhysicalLegal}
      />
    </span>
    <label className="form-label" htmlFor="legal-form-checkbox">
      Название организации
    </label>
    <input
      type="text"
      className="form-input"
      placeholder="Введите название организации"
      disabled={isPhysicalLegal}
    />
    <label className="form-label" htmlFor="legal-form-checkbox">
      Название ИП
    </label>
    <input
      type="text"
      className="form-input"
      placeholder="Введите ваше имя"
      disabled={isPhysicalLegal}
    />
    <label className="form-label" htmlFor="legal-form-checkbox">
      Почта
    </label>
    <input
      type="email"
      className="form-input"
      placeholder="name@example.com"
      disabled={isPhysicalLegal}
    />
    <label className="form-label" htmlFor="legal-form-checkbox">
      Телефон
    </label>
    <input
      type="tel"
      className="form-input"
      placeholder="+7 123 456 78 90"
      disabled={isPhysicalLegal}
    />
  </form>
      </div>
  </div>,
  <div key="delivery-form">
    <h3 className="form-title delivery-title">Доставка</h3>
          <div className="form-row delivery-row">
            <div className="form-row-row">
              <div className="form-column form-form city-input">
                <label className="form-label">Город</label>
                <input type="tel" className="form-input" placeholder="Москва" />
              </div>
            </div>
            <div className="form-row-row">
              <span className="form-subtitle">Способ получения</span>
              <div className="form-row delivery-main-row">
                <div className="form-column phiz-form-column">
                  <form action="" className="phiz-form form-form">
                    <span className="form-subtitle">
                      Пункт выдачи{" "}
                      <input type="checkbox" className="form-checkbox" />
                    </span>
                    <div className="delivery-map">
                      <button type="button" className="map-btn" onClick={() => {
                        const mapBlock = document.querySelector('.map');
                        mapBlock.classList.toggle('hidden');
                      }}>Карта</button>
                      <div className="map hidden"></div>
                      <span className="delivery-sub-title">Выбранный пункт выдачи</span>
                      <span className="delivery-text-place">улица Березовская, 101</span>
                      <span className="delivery-text-price">450 руб</span>
                      <button className="change-place-btn">Выбрать другой пункт выдачи</button>
                    </div>
                  </form>
                </div>
                <div className="form-column legal-form-column">
                  <form action="" className="phiz-form form-form">
                    <span className="form-subtitle">
                      Курьером
                      <input type="checkbox" className="form-checkbox" />
                    </span>
                    <label className="form-label">Мой адрес</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Введите значение"
                    />
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Дом"
                    />
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Подъезд"
                    />
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Квартира"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
  </div>,
  <div key="payment-form">
    <h3 className="form-title end">Оплата</h3>
          <div className="form-row pay-row">
            <div className="form-column spb-column">
              <form action="" className="form-form">
                <span className="form-subtitle ">
                  СПБ
                  <input type="checkbox" className="form-checkbox" />
                </span>
                <p>Поясняющий текст как в подробностях происходит оплата</p>
              </form>
            </div>
            <div className="form-column legal-form-column">
              <form action="" className="form-form">
                <span className="form-subtitle">
                  Выслать счёт
                  <input type="checkbox" className="form-checkbox" />
                </span>
                <p>Поясняющий текст как в подробностях происходит оплата</p>
              </form>
            </div>
          </div>
  </div>,
    <div key="done-form">
      <div className="form-done">
            <h3 className="form-title end">К оформлению заказа все готово</h3>
      </div>
  </div> 
  ];

  const totalFormsCount = forms.length;

  const handleNextBtnClick = () => {
    setCurrentFormIndex((prevIndex) =>
      prevIndex === totalFormsCount - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevBtnClick = () => {
    setCurrentFormIndex((prevIndex) =>
      prevIndex === 0 ? totalFormsCount - 1 : prevIndex - 1
    );
  };

  return (
    <div className="CartForm__container">
      {forms[currentFormIndex]}
      <nav className="CartForm__navigation">
        <button
          className="CartForm__navigation-btn"
          onClick={handlePrevBtnClick}
          disabled={currentFormIndex === 0}
        >
          Назад
        </button>
        <span className="CartForm__navigation-counter">
          {currentFormIndex + 1} из {totalFormsCount}
        </span>
        {currentFormIndex === totalFormsCount - 1 ? (
          <button
            className="CartForm__navigation-btn CartForm__navigation-btn--order"
          >
            Оформить заказ
          </button>
        ) : (
          <button
            className="CartForm__navigation-btn"
            onClick={handleNextBtnClick}
            disabled={currentFormIndex === totalFormsCount - 1}
          >
            Далее
          </button>
        )}
      </nav>
    </div>

  );

}
