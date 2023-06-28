import { useContext } from "react";
import { NavLink } from "react-router-dom"
import { Context } from "../../contexto/Context";

const NavItem = ({ className, to, navbarName, category }) => {
  const {setSearchByCategory} = useContext(Context);
  const textDecoration = 'font-semibold underline underline-offset-4'

  return (
    <>
    <li className={(className)}>
      <NavLink
        to={to}
        onClick={() => setSearchByCategory(category)}
        className={
          ({ isActive }) => (isActive ? textDecoration : undefined)
        }
      >
        {navbarName}
      </NavLink>
    </li>
    </>
  )
}

export default NavItem