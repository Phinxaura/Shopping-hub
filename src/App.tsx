import './App';
import './App.scss';
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
//pages
import { Home,Category,Cart } from './pages/index';
//components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import store from './store/store';
import { Provider } from 'react-redux';
function App() {
 
  return (
 
     <div className='App'>

      <Provider  store =  {store}>
      <Router>
       <Navbar/>
        <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/category/:id' element = {<Category/>} />
          <Route path =  'cart' element = {<Cart/>}/>
        </Routes>
        <Footer/>
      </Router>
      </Provider>
      
   
     </div>
  )
}

export default App
