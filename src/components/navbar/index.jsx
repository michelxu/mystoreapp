import { NavLink } from "react-router-dom";
import NavItem from "../navitem";
import { useContext } from "react";
import { Context } from "../../contexto/Context";
import { ShoppingBagIcon } from '@heroicons/react/24/solid'


const NavBar = () => {
  const {counter, openCheckoutSM, setSearchByCategory} = useContext(Context);

  const navItems = [
    { name: 'All', to: '/' },
    { name: 'Mens', to: '/mens', category_name: `men's clothing` },
    { name: 'Womens', to: '/womens', category_name: `women's clothing` },
    { name: 'Electronics', to: '/electronics', category_name: `electronics` },
    { name: 'Jewelery', to: '/jewelery', category_name: `jewelery` },
  ];

  const navItems2 = [
    { name: 'Account', to: '/account'},
    { name: 'My Orders', to: '/orders' },
    { name: 'Sign In', to: '/signin' },
  ];

  const navitem_class = 'text-md font-regular hover:rounded hover:text-gray-100'

  return (
    <>
    <nav className='flex sm:flex-col md:flex-col lg:flex-row justify-between items-center fixed top-0 z-10 w-full py-4 bg-black'>
      {/* left section */}
      <ul className='flex flex-wrap items-center gap-3 mx-4 text-white'>
      {/* logo first li */}
      <li>
        <NavLink to='/' className='font-semibold text-xl' onClick={() => setSearchByCategory(null)}>
          Store
        </NavLink>
      </li>
        {
          navItems.map(({ to, name, category_name }) => (
            <NavItem
              key={name}
              to={to}
              className={navitem_class}
              navbarName={name}
              category={category_name}
            />
          ))
        }
      </ul>
      {/* right section */}
      <ul className='flex flex-wrap items-center gap-3 mx-4 text-white'>
        <li className="text-rose-400 text-md font-regular hover:text-rose-300">
          <a href="mailto:jeanmbcode@gmail.com">@jeanmbcode</a>

        </li>
        {
          navItems2.map(({ to, name }) => (
            <NavItem
              key={name}
              to={to}
              className={navitem_class}
              navbarName={name}
            />
          ))
        }
        <li>
        <NavLink className='font-semibold'>
          <div className="flex justify-center items-center w-[52px] gap-1 border border-white rounded px-1.5 py-0.5"
            onClick={() => openCheckoutSM()}>
            <ShoppingBagIcon className='h-4 hover:text-gray-100'></ShoppingBagIcon>
            <p>{counter}</p>
          </div>
        </NavLink>
      </li>
      </ul>
    </nav>
    </>
  )
}

export default NavBar