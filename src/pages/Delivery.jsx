import Header from "../components/Header/Header";
import '../styles/descPage.css'
import delivery from '../components/Images/img/delivery.jpg'
import Footer from "../components/Footer/Footer"
import CatalogMain from "../components/Catalog/CatalogMain";

export default function Delivery(){
    return(
        <>
        <Header/>
        <section class="description">
            <div class="description__container container">
                <div class="description__column">
                    <h1 class="description__column-title">Доставка</h1>
                    <div class="description__column-text">
                        <p class="description__column-p">Доставка товара осуществляется через транспортные компании.</p>
                        <p class="description__column-p">Расчет стоимости производится при оформлении заказа с помощью калькулятора расчета доставки на сайте или менеджером при необходимости. </p>
                        <p class="description__column-p">Условия и стоимость доставки может быть изменена менеджером только после согласования  с клиентом.</p>
                        <p class="description__column-p">Клиент вправе выбрать любую транспортную компанию, которая одновременно присутствует в населенном пункте отправителя и получателя.</p>
                        <p class="description__column-p">Самовывоз не осуществляется.</p>
                    </div> 
                </div>
                <div class="description__column">
                    <img src={delivery} alt="" class="description__column-img"/>
                </div>
            </div>
        </section>
        <Footer></Footer>
        </>
    )
}