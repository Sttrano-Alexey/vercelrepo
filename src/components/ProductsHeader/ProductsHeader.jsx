import '../ProductsHeader/ProductsHeader.css'

export default function ProductHeader(){

  const toLineView = () => {
    document.querySelector('.products').classList.add('line')
  }

  const toBlockView = () => {
    document.querySelector('.products').classList.remove('line')
  }

    return(
        <>
            <div className="products__header">
              <div className="products__way">
                Каталог/Компьютеры/Планшеты
              </div>
              <div className="products__title">
                <h3>Планшеты</h3>
                <span>19 товаров</span>
              </div>
              <div className="view__buttons">
                <button className="viewBtn" onClick={toLineView}>
                  <svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="32" height="7" rx="3" fill="#D9D9D9" />
                      <rect y="20" width="32" height="7" rx="3" fill="#D9D9D9" />
                      <rect y="10" width="32" height="7" rx="3" fill="#D9D9D9" />
                  </svg>
                </button>
                <button className="viewBtn" onClick={toBlockView}>
                  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="12" height="12" fill="#D9D9D9" fillOpacity="1" />
                    <rect y="15" width="12" height="12" fill="#D9D9D9" fillOpacity="1" />
                    <rect x="15" y="15" width="12" height="12" fill="#D9D9D9" fillOpacity="1" />
                    <rect x="15" width="12" height="12" fill="#D9D9D9" fillOpacity="1" />
                  </svg>
                </button>
              </div>
            </div>
        </>
    )
}