import './Advantages.css'
import advImg1 from './AdvantagesImage/diagram_adv.svg'
import advImg2 from './AdvantagesImage/like_adv.svg'
import advImg3 from './AdvantagesImage/money_adv.svg'
import advImg4 from './AdvantagesImage/support_adv.svg'
import advImg5 from './AdvantagesImage/trolley_adv.svg'
import advImg6 from './AdvantagesImage/truck_adv.svg'

export default function Advantages(){
    return(
        <>
            <section className='advantages'>
                <div className="advantages__container container">
                    <div className="advantages__item">
                        <img src={advImg3} alt="" />
                        <p>
                            2 способа оплаты QR-код выставленный счет
                        </p>
                    </div>
                    <div className="advantages__item">
                        <img src={advImg1} alt="" />
                        <p>
                            Более 8 лет на рынке IT  оборудования
                        </p>
                    </div>
                    <div className="advantages__item">
                        <img src={advImg2} alt="" />
                        <p>
                            Гарантия на товар и удобные условия возарата
                        </p>
                    </div>
                    <div className="advantages__item">
                        <img src={advImg6} alt="" />
                        <p>
                            Доставка осуществляется компанией СДЭК
                        </p>
                    </div>
                    <div className="advantages__item">
                        <img src={advImg4} alt="" />
                        <p>
                            Консультация и помощь от наших менеджеров
                        </p>
                    </div>
                    <div className="advantages__item">
                        <img src={advImg5} alt="" />
                        <p>
                            Большой ассортимент товара
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}