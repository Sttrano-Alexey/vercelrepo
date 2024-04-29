import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Delivery from './pages/Delivery'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import ProductsInfo from './pages/ProductsInfo'
import './styles/load.css'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/index.html" element={<Home/>}/>
        <Route path="/delivery" element={<Delivery/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/info_products/:productId" element={<ProductsInfo/>}/>
        {/* <Route path="*" element={<NoPage/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
