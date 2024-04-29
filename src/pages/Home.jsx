import Advantages from "../components/Advantages/Advantages"
import Footer from "../components/Footer/Footer"
import Head from "../components/Head/Head"
import Header from "../components/Header/Header"
import Categories from "../components/Categories/Categories"
import Appliances from "../components/Appliances/Appliances"
import TabsMobile from "../components/TabsMobile/TabsMobile"
export default function Home (){
    return(
        <>
        <Header></Header>
        <div className="wrapper">
            <Head></Head>
            <Advantages></Advantages>
            {window.innerWidth > 758 && <Categories></Categories>}
            {window.innerWidth > 758 && <Appliances></Appliances>}
            {window.innerWidth < 758 && <TabsMobile></TabsMobile>}
        </div> 
        <Footer></Footer>
        </>
    )
}