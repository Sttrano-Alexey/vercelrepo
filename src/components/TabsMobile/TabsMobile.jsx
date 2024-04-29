import './TabsMobile.css'
import React, { useState } from 'react'

export default function TabsMobile() {

  const [openTab, setOpenTab] = React.useState(-1)

  return (
    <>
      <div className="tabs">
        <div className="tabs__container container">
          {[
            {
              title: 'Гарантия',
              content: (
                <>
                <p>Все товары в интернет магазине новые и имеют свой срок гарантийного обслуживания.</p>
                <p>Гарантия и обслуживание устанавливается производителем.</p>
                <p>Гарантийное обслуживание товаров выполняется производителем.</p>
                <p><strong>Как воспользоваться гарантией?</strong></p>
                <p>Обратиться напрямую в авторизованный сервисный центр.</p>
                <p>Обратиться в наш магазин.</p>
                <p>Обязательно иметь при себе чекили накладную.</p>
                <span>В случае невозможности поставки товара денежные средства возвращаются покупателю по заявлению в течении срока, установленного законами РФ.</span>
                </>
              )
            },
            {
              title: 'Доставка',
              content: (
                <>
                <p>Доставка товара осуществляется через транспортные компании. </p>
                <p>Расчет стоимости производится при оформлении заказа с помощью калькулятора расчета доставки на сайте или менеджером при необходимости.</p>
                <p>Условия и стоимость доставки может быть изменена менеджером только после согласования  с клиентом.</p>
                <p>Все товары в интернет магазине новые и имеют свой срок гарантийного обслуживания.</p>
                <p>Клиент вправе выбрать любую транспортную компанию, которая одновременно присутствует в населенном пункте отправителя и получателя.</p>
                <p>Самовывоз не осуществляется.</p>
                </>
              )
            },
            {
              title: 'О нас',
              content: '3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, doloremque!'
            },
            {
              title: 'Юридическим лицам',
              content: '4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, nostrum!'
            },
            {
              title: 'Оплата',
              content: ' 5Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, atque!'
            }
            ,
            {
              title: 'Контакты',
              content: ' 5Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, atque!'
            }
          ].map((item, index) => (
            <div key={index} className="tabs-item">
              <button className={`tab-button${openTab === index ? ' tab-active' : ''}`}
                      onClick={() => {
                        setOpenTab(openTab === index ? -1 : index)
                      }}>
                {item.title}
                <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5L0.75 9.76314L0.75 0.23686L9 5Z" fill="white"/>
                </svg>
              </button>
              <div className={`tab-content${openTab === index ? ' tabs-show' : ''}`}>
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}


