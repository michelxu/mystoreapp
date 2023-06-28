import { useRoutes, BrowserRouter } from 'react-router-dom';
import { Data } from '../../contexto/Context';
import Home from '../home';
import MyAccount from '../my_account';
import MyOrder from '../my_order';
import MyOrders from '../my_orders';
import NotFound from '../not_found';
import SignIn from '../sign_in';
import NavBar from '../../components/navbar';
import Layout from '../../components/Layout';
import './App.css'
import CheckoutSideMenu from '../../components/CheckoutSideMenu/CheckoutSideMenu';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home />},
    { path:'/:category', element:<Home />},
    { path: '/Account', element: <MyAccount />},
    { path: '/Order', element: <MyOrder />},
    { path: '/Orders', element: <MyOrders />},
    { path: '/Orders/last', element: <MyOrder />},
    { path: '/Orders/:id', element: <MyOrder />},
    { path: '/SignIn', element: <SignIn />},
    { path: '/*', element: <NotFound />},
  ])

  return routes
}

const App = () => {
  return (
    <Data>
      <BrowserRouter basename='/mystoreapp'>
        <NavBar/>
        <CheckoutSideMenu/>
        <Layout>
          <AppRoutes/>
        </Layout>
      </BrowserRouter>
    </Data>
  )
}

export default App
