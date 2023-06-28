import { useContext } from "react";
import { Context } from "../../contexto/Context";
import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid'

const Card = ({data}) => {
  const {counter, setCounter, openProductDetail, closeProductDetail,
    setProductToShow, cartProducts, setCartProducts, openCheckoutSM, closeCheckoutSM, addProductsToCart}
    = useContext(Context);

  const showProduct = (product) =>{
    closeCheckoutSM();
    openProductDetail();
    setProductToShow(product);
  }

  /* se movio al Context de la app
  const addProductsToCart = (product) =>{
    //Buscar product en el cart: true/false
    const productExists = cartProducts.some(p => p.id === product.id);
    console.log('product exists: '+productExists);

    //Si el producto existe:
    if (productExists) {
			const productCart = cartProducts.find(p => p.id === product.id); // Busca el producto
			productCart.quantity += 1; // Cantidad = +1
		} else {
			product.quantity = 1; // Si no, crea la propiedad quantity = 1.
      setCartProducts([...cartProducts, product]);
		}

    setCounter(counter+1);
    closeProductDetail();
    openCheckoutSM();
  }
  */

  const renderIcon = (id) => {
    const isInCart = cartProducts.filter(product => product.id === id).length > 0;

    if (isInCart){
      return (
        <button className='absolute top-0 right-0 flex justify-center items-center bg-gray-400 w-8 h-8 pb-0.5 m-1.5 rounded-full text-white font-semibold cursor-pointer'>
          <CheckIcon className='h-7'/>
        </button>
      )
    } else{
      return (
        <button className='absolute top-0 right-0 flex justify-center items-center bg-gray-900 w-8 h-8 pb-0.5 m-1.5 rounded-full text-white font-semibold cursor-pointer'
          onClick={() => addProductsToCart(data)}>
          <PlusIcon className='h-7 hover:text-gray-100'/>
        </button>
      )
    }

    
  }

  return (
    <>
    <div className='flex flex-col items-center bg-white h-64 w-56 rounded-md border border-gray-300 cursor-pointer'>
      {/* top section - AddBtn, Image, CategoryBtn */}
      <figure className='relative mb-0 w-full h-4/5'>
        {/* AddBtn */}
        {renderIcon(data.id)}
        <img src={data.image} alt={data.title}
          className='h-full object-cover rounded-t-md mx-auto'
          onClick={() => showProduct(data)}/>
        <button className='absolute bottom-0 left-0 bg-gray-900 px-2 py-0.5 m-1.5 text-xs rounded-full text-white'
          onClick={() => alert(`${data.category}`)}>
          {data.category}
        </button>
      </figure>

      {/* bottom section - Title, Price */}
      <div className='flex flex-col w-full justify-start px-2' 
        onClick={() => showProduct(data)}>
        <p className='text-md font-regular me-2 whitespace-nowrap overflow-hidden text-overflow-ellipsis truncate'>{data.title}</p>
        <p className='text-xl font-bold -my-1'>${data.price.toFixed(2)}</p>
      </div>
    </div>
    </>
  )
}

export default Card