import { useContext } from "react";
import { Context } from "../../contexto/Context";

const OrdersCard = (props) => {
  const {totalPrice, totalItems, date, id} = props;
  const {removeFromCart, quantityAdd, quantitySubtract} = useContext(Context);

  return (
    <>
    <div className='flex flex-col justify-start rounded-lg border border-gray-300 bg-white mx-1 my-2 p-2'>
        <div className='flex justify-between text-center text-gray-600 text-sm font-regular'>
          <p>Order #{id}</p>
          <p>Date: {date}</p>
        </div>
        <p className='text-xl font-semibold'>${totalPrice}</p>
        <p className='text-sm font-regular text-gray-600'>Items: {totalItems}</p>
    </div>
    </>
  )
}

export default OrdersCard