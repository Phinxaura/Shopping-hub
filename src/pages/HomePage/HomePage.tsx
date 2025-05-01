import Slider from "../../components/Slider/Slider";
import "./HomePage.scss";
import Category from '../../components/Category/Category';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories,fetchProductsByCategory } from "../../store/categorySlice";
import  { useEffect } from "react";
import SingleCategory from "../../components/SingleCategory/SingleCategory";
import { fetchProducts } from "../../store/productSlice";
import ProductList from "../../components/ProductList/ProductList";


const HomePage = () => {
  const dispatch : any= useDispatch();
  const {data: categories,status : categoryStatus } = useSelector((state:any)=>state.category);
  const {catProductAll: productsByCategory, catProductAllStatus} = useSelector((state:any) => state.category);
  // console.log(productsByCategory);
  // console.log(catProductAllStatus);
// console.log(productsByCategory);
  const { data : products , status : productStatus } = useSelector((state:any)=>state.product);


  useEffect(()=>{
     async function fetchData(){ 
      await dispatch(fetchProducts()); 
      await dispatch(fetchCategories());
      await dispatch(fetchProductsByCategory(2,'all'));
      await dispatch(fetchProductsByCategory(3,'all')); 
    }
    fetchData();}
  ,[])


  return (
    <div className="home-page">
      <Slider/>
      <Category categories = {categories} status = {categoryStatus} />

      <ProductList products = {products}  status = {productStatus}/>

      {/* category one products */}
      <section>
{
        productsByCategory[0] && <SingleCategory 
        products = {productsByCategory[0]} status = {catProductAllStatus}/>
}
      </section>
      {/* category two products */}
      <section>
        {
        productsByCategory[1]   && <SingleCategory products = {productsByCategory[1]} status = {catProductAllStatus}/>
}
      </section>      
    </div>
  )
}

export default HomePage
