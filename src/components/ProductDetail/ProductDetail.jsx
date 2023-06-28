import { useContext } from 'react';
import { Context } from '../../contexto/Context';
import './styles.css';
import { XCircleIcon } from '@heroicons/react/24/outline'
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

const ProductDetail = () => {
  const {isProductDetailOpen, closeProductDetail, productToShow, addProductsToCart} = useContext(Context);

  return (
    <>
    <aside
    className={`${isProductDetailOpen ? 'flex' : 'hidden'}
    flex-col fixed mt-20 sm:mt-7 lg:mt-0 bottom-0 right-0 w-80
    border border-gray-700 bg-white rounded-lg product-detail scrollable-cards`}>
      {/* top section */}
      <div className='flex justify-between items-center p-2'>
        <h2 className='font-medium text-xl'>Details</h2>
        <XCircleIcon className="h-8 w-8 cursor-pointer hover:text-gray-700" onClick={() => closeProductDetail()}/>
      </div>
      <div className='flex flex-col m-2'>
        <img src={productToShow.image} className='h-250 max-w-full max-h-[250px] object-contain mx-auto m-2' alt={productToShow.title}/>
        <h2 className='text-md font-medium'>{productToShow.title}</h2>
        <h2 className='text-2xl font-semibold mb-4'>${productToShow.price?.toFixed(2)}</h2>
        <span className='text-sm font-regular text-gray-600'>Description:</span>
        <h3 className='text-sm font-regular text-gray-600 mb-6'>{productToShow.description}</h3>
        <button className="flex flex-row justify-center items-center mx-auto gap-2 bg-black text-white py-2 px-4 w-36 rounded hover:bg-zinc-900"
        onClick={() => addProductsToCart(productToShow)}>
          <p className='text-sm font-semibold'>Add to cart</p> 
          <ShoppingBagIcon className='h-4'></ShoppingBagIcon>
        </button>
      </div>
    </aside>
    </>
  )
}

export default ProductDetail