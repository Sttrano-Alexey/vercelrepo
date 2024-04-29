import Footer from '../Footer/Footer'
import './FastOrderMobile.css'

export default function FastOrderMobile({onClose}){
    return(
        <>
            <div className="fast-order">
                <div className="fast-order-container">
                    <p className="fast-order-title">
                        Быстрое оформление заказа
                    </p>
                    <form action="" className='fast-form'>
                        <label className='form-label' htmlFor="">ФИО</label>
                        <input className='form-input' type="text" placeholder='Иванов Иван Иванович'/>
                        <label className='form-label' htmlFor="">Телефон</label>
                        <input className='form-input' type="text" placeholder='+7 (999) 999-99-99'/>
                        <button className='fast-order-button'>Заказать</button>
                    </form>
                </div>
                <button className='catalog-close order' onClick={onClose}>
                    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-4.80825e-07 10L16.5 0.47372L16.5 19.5263L-4.80825e-07 10Z" fill="#ffff"/>
                    </svg>
                    назад
                </button>
                <div className="fast-order-bg" onClick={onClose}></div>
            <Footer></Footer>
            </div>
        </>
    )
}