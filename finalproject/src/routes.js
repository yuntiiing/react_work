import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Customer from 'src/pages/Customer';
import Order from 'src/pages/Order';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Product from 'src/pages/Product';
import SalesReport from 'src/pages/SalesReport';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'customers', element: <Customer /> },
      { path: 'order', element: <Order /> },
      { path: 'products', element: <Product /> },
      { path: 'settings', element: <SalesReport /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
