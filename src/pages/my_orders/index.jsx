import { useContext } from "react";
import OrdersCard from "../../components/OrdersCard/OrdersCard"
import { Context } from "../../contexto/Context";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { order } = useContext(Context);

  return (
    <>
    <div className='flex justify-center w-80'>
      <h2 className='font-medium text-xl mb-4'>
        My Orders
      </h2>
    </div>
    { order.length > 0 && (
      <div className='w-80'>
        <div className='flex flex-col mb-8 px-4 pt-4 pb-16 rounded-lg border border-gray-300'>
        {
          order?.map((order, i) => (
            <Link key={i} to={`/orders/${i+1}`}>
            <OrdersCard
              key={i}
              id={order.id}
              date={order.date}
              totalPrice={order.total}
              totalItems={order.totalItems}
            />
            </Link>
          ))
        }
        </div>
      </div>
    )}
    </>
  )
}

export default MyOrders