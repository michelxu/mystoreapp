import { useContext, useEffect, useRef, useState } from "react"
import Card from "../../components/Card/Card"
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { Context } from "../../contexto/Context";
import { useParams } from "react-router-dom";

const Home = () => {
  let { category } = useParams();
  const { products, searchByTitle, setSearchByTitle, filteredProducts, setSearchByCategory, searchByCategory } = useContext(Context);

  useEffect(() => {
    if(category === 'mens') category = `men's clothing`;
    if(category === 'womens') category = `women's clothing`;
    
    if (searchByCategory === null) setSearchByCategory(category);
  }, []);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [category]);

  const renderView = () => {
    if(filteredProducts?.length > 0) {
      return (
        filteredProducts?.map((product) => (
          <Card key={product.id} data={product}/>
        ))
      )
    } else{
      return (
        <>
        <div></div>
        <div className='flex justify-center items-center text-center'>
          <p className='font-regular text-md text-center'>No Results Found</p>
        </div>
        <div></div>
        </>
      )
    }
  }
  
  return (
    <>
    <div className='flex flex-col items-center justify-center relative w-80 mb-4'>
      <h2 className='font-medium text-xl mb-2'>
        Exclusive Products
      </h2>
      <input
      type="text"
      placeholder='Amazing items'
      onChange={(e) => setSearchByTitle(e.target.value)}
      ref={inputRef}
      className="border border-gray-300 w-80 px-4 py-2 rounded-lg shadow-sm mb-4 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
      />
    </div>
    <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-32 gap-4'>
      {
        renderView()
      }
    </div>
    <ProductDetail/>
    </>
  )
}

export default Home