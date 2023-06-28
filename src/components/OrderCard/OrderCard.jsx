import { XMarkIcon } from "@heroicons/react/24/outline"
import { useContext } from "react";
import { Context } from "../../contexto/Context";

const OrderCard = (props) => {
  const {id, title, image, price, quantity, allowButtons} = props;
  const {removeFromCart, quantityAdd, quantitySubtract} = useContext(Context);

  /* Show/Hide Buttons
    allowButtons: es una prop que envía true/false, para mostrar botones en el carrito
    u ocultarlos al desplegar la orden.
  */
  let handleButtons;
  if(allowButtons){
    handleButtons = (
    <>
    <div className='flex gap-2'>
      <button className={`px-2.5 my-0.5 pb-0.5  rounded-md ${quantity < 2 ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-gray-200'}`}
        onClick={() => quantitySubtract(id)}>-
      </button>
      <p className='text-lg font-regular text-center w-6'>{quantity}</p>
      <button className={`px-2 my-0.5 pb-0.5 bg-gray-200 rounded-md ${quantity > 9 ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-gray-200'}`}
        onClick={() => quantityAdd(id)}>+
      </button>
    </div>
    <button onClick={() => removeFromCart(id)}>
      <XMarkIcon className="h-7 w-7 cursor-pointer hover:text-gray-700"/>
    </button>
    </>
    )
  } else{
    handleButtons = (
      <>
      <div className='flex gap-2 text-center'>
        <p className='text-md font-regular'>Qty: {quantity}</p>
      </div>
      </>
    )
  }

  return (
    <>
    <div className='flex justify-between items-center rounded-lg border border-gray-300 bg-white mx-1 my-2 p-1'>
      <div className='flex items-center gap-2'>
        <figure className='w-20 h-20'>
          <img src={image} className='w-full h-full rounded-lg object-contain' alt={title}/>
        </figure>
        <div className='flex flex-col'>
          <p className='text-sm font-regular w-52 truncate text-ellipsis'>{title}</p>
          <p className='text-xl font-semibold mb-1'>${price.toFixed(2)}</p>
          <div className='flex flex-row justify-start gap-4'>
            {/* Show/Hide Buttons */}
            {handleButtons}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default OrderCard