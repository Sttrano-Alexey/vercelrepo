import './brands.css'
import appleImg from './BrandsImg/apple.svg'
import honorImg from './BrandsImg/HONOR.svg'
import hpImg from './BrandsImg/hp.svg'
import intelImg from './BrandsImg/intel.svg'
import miIMg from './BrandsImg/mi.svg'

export default function Brand(){
    return(
        <section className="brands">
            <div className="brands__container container">
                {[appleImg, honorImg, hpImg, intelImg, miIMg].map((img, i) => <img key={i} className='brands__item' src={img} alt={`brand-${i}`} /> )}
            </div>
        </section>  
    )
}
