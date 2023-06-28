import { useContext } from 'react';
import { Context } from '../../contexto/Context';
import { Link } from 'react-router-dom';
import OrderCard from '../OrderCard/OrderCard';
import './styles.css';
import { XCircleIcon } from '@heroicons/react/24/outline'
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

const CheckoutSideMenu = () => {
  const {isCheckoutSMOpen, closeCheckoutSM, cartProducts, setCartProducts, totalPrice, order, setOrder, counter, setCounter, setSearchByTitle} = useContext(Context);

  const handleCheckout = () => {
    const date = new Date();

    //Return if cart is empty
    if (cartProducts.length === 0) return alert('Empty cart');

    //1) Add new order to MyOrders
    const orderToAdd = {
      id: order.length+1,
      date: date.toLocaleDateString(),
      products: cartProducts,
      totalItems: counter, //cartProducts.length for total individual items
      total: totalPrice.toFixed(2),
    }
    // part 2
    setOrder([...order, orderToAdd]);

    //Clear: Cart, NavBar Cart, Input
    setCartProducts([]);
    setCounter(0);
    closeCheckoutSM();
    setSearchByTitle(null);
  }

  return (
    <>
    <aside
    className={`${isCheckoutSMOpen ? 'flex' : 'hidden'}
      flex-col fixed z-50 mt-20 sm:mt-7 lg:mt-0 top-0 bottom-0 right-0 w-80 
      border border-gray-700 bg-white rounded-lg checkout-side-menu scrollable-cards`}>
      {/* top section */}
      <div className='flex justify-between items-center p-2'>
        <h2 className='font-medium text-xl'>My Order</h2>
        <XCircleIcon className="h-8 w-8 cursor-pointer hover:text-gray-700" onClick={() => closeCheckoutSM()}/>
      </div>
      {/* flex-1 hace ocupar el espacio disponible */}
      <div className='flex-1'>
        {
          cartProducts.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
              allowButtons={true}
            />
          ))
        }
      </div>
      <div className='flex justify-between items-center mb-2'>
        <p className='mx-4 my-4 text-lg font-regular text-right'>Total:</p>
        <p className='mx-4 my-4 text-2xl font-semibold text-right'>${totalPrice?.toFixed(2)}</p>
      </div>
      <Link to='/orders/last'>
        <button className="flex flex-row justify-center items-center mx-auto gap-2 bg-black text-white py-2 px-4 w-36 rounded hover:bg-zinc-900"
          onClick={() => handleCheckout()}>
            <p className='text-sm font-semibold'>Checkout</p> 
            <ShoppingBagIcon className='h-4'></ShoppingBagIcon>
        </button>
      </Link>
    </aside>
    </>
  )
}

export default CheckoutSideMenu