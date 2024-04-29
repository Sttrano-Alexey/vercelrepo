import HeadSlider from '../Slider/HeadSlider'
import Brand from './Brands/Brands'
import './head.css'
import laptop from '../Images/img/laptop_categories.png'

export default function Head() {
    const catalogItems = [
        'Компьютеры, ноутбуки, планшеты',
        'Серверы и хранение',
        'Портативная электроника',
        'Оргтехника, периферия',
        'Расходные материалы',
        'Комплектующие',
        'Носители информации',
        'Сетевое оборудование'
    ];

    return (
<>
        <section className='head'>
            <div className="head__container container">
                <div className="head__catalog">
                    <ul>
                        {catalogItems.map((item, index) => <li key={index}>{item}</li>)}
                        <button><span>Открыть полный каталог</span></button>
                    </ul>
                </div>
                {window.innerWidth < 758 && (
                    <div className="head__catalog-mobile">
                        {Array.from({ length: 8 }, (_, i) => <div key={i} className="head__catalog-mobile-item">
                            <img src={laptop} alt="" />
                            <span>Телевизоры</span>
                        </div>)}
                        <button>
                            Перейти в каталог
                        </button>
                    </div>
                )}
                {window.innerWidth > 758 && <> 
                    <HeadSlider />
                </>}
            </div>
        </section>
        <Brand />
</>

    )
}
