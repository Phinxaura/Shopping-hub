import './SingleProduct.scss';
import { setIsModalVisible } from "../../store/modalSlice";
import { formatPrice } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addtoCart } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';


const SingleProduct = () => {
  const dispatch: any = useDispatch();
  const [qty , setQty ] = useState(1);
  const  navigate = useNavigate();
  const { data: product } = useSelector((state: any) => state.modal);

  const increaseQty = () => {
      setQty((prevQty :any  ) => {
       let newQty = prevQty + 1;
      return newQty;
      })
  }
  const decreaseQty = () => {
    setQty((prevQty : any ) => {
     let newQty = prevQty - 1;
     if(newQty < 1){
      newQty = 1;
     }
    return newQty;
    })
}

  const modalOverlayHandler = (e: any) => {
    if (e.target.classList.contains('overlay-bg')) {
      dispatch(setIsModalVisible(false));
    }
  }

  const addToCartHandler = (product : any ) =>{
        let totalPrice  = qty * product.price;
        const tempProduct = {
          ...product , 
          quantity:qty,
          totalPrice
        }
        dispatch(addtoCart(tempProduct));
        dispatch(setIsModalVisible(false));
        navigate('/cart');
  }
  return (
    <div className='overlay-bg' onClick = {modalOverlayHandler}>
      <div className = "product-details-modal bg-white">
        <button type = "button" className='modal-close-btn flex flex-center fs-14' onClick={() => dispatch(setIsModalVisible(false))}>
          <i className = "fas fa-times"></i>
        </button>
        <div className = "details-content grid">
          {/* details left */}
          <div className = "details-right">
            <div className = "details-img">
              <img src = {product.images[0]} alt = {product.title} />
            </div>
          </div>
          {/* detials right */}
          <div className='details-left'>
            <div className = "details-info">
              <h3 className = "title text-regal-blue fs-22 fw-5">{product.title}</h3>
              <p className='description text-pine-green'>{product.description}</p>
              <div className='price fw-7 fs-24'>Price: {formatPrice(product.price)}</div>
              <div className = "qty flex">
                <span className = "text-light-blue qty-text">Qty: </span>
                <div className = "qty-change flex">
                  <button type = "button" className='qty-dec fs-14' onClick={()=>decreaseQty()} >
                    <i className = "fas fa-minus text-light-blue" ></i>
                  </button>
                  <span className = "qty-value flex flex-center">{qty}</span>
                  <button type = "button" className='qty-inc fs-14 text-light-blue' onClick={() => increaseQty()}>
                    <i className = "fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <button type = "button" className='btn-primary add-to-cart-btn' onClick={() => addToCartHandler(product)}>
                  <span className = "btn-icon">
                    <i className='fas fa-cart-shopping'></i>
                  </span>
                  <span className = 'btn-text'>Add To Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct;
