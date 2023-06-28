import { useContext } from "react";
import { Context } from "../../contexto/Context";
import OrderCard from "../../components/OrderCard/OrderCard";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";


const MyOrder = () => {
  const { order } = useContext(Context);
  
  //*************** get order id/index from url ***************
  const currentPath = window.location.pathname; // mystore.com/orders/___
  const parts = currentPath.split('/'); 
  let index = parts[parts.length - 1]; //Output: 'last' or #

  if (index === 'last') {
    //Obtener la última orden
    index = order?.length - 1;
  } else{
    //Obtener el index correcto (id-1)
    index = index-1;
  }
  console.log('index: '+index);
  console.log('order length: '+order.length);
  //*************** get order id/index from url ***************

  return (
    <>
    <div className='flex items-center justify-center relative w-80 mb-4'>
      <Link to='/orders' className='absolute left-0'>
        <ChevronLeftIcon className="h-7 w-7 cursor-pointer hover:text-gray-700"/>
      </Link>
      <h2 className='font-medium text-xl'>
        My Order
      </h2>
    </div>
    {/* orders */}
    { order.length > 0 && (
      <div className='flex flex-col px-4 pt-4 pb-8 rounded-lg border border-gray-300'>
        <p className='text-gray-600 text-sm font-regular'>Order #{index+1}</p>
        {
          order?.[index]?.products?.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
              allowButtons={false}
            />
          ))
        }
        <div className='flex justify-between items-center'>
          <p className='mx-4 my-4 text-lg font-regular text-right'>Total:</p>
          <p className='mx-4 my-4 text-2xl font-semibold text-right'>${order?.[index]?.total}</p>
        </div>
      </div>
    )}
    </>
  )
}

export default MyOrder