import './MobileSearch.css'

export default function MobileSearch({onClick}){
    return(
        <>
            <div className="mobile-search">
                <form className="mobille-search-body">
                    <span>Поиск товара</span>
                    <div>
                        <input className='mobile-input-search' type="text" placeholder="Поиск по сайту"/>
                    </div>
                    <button className='mobile-input-bth'>Искать в каталоге</button>
                </form>
                <div className="mobile-search-bg" onClick={onClick}></div>
            </div>
        </>
    )
}