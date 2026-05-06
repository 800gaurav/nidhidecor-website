import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './routers/router'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from './utils/Loader'
import { CustomToastContainer } from './component/toaster'
import { CartContextProvider } from './context/CartContext'


// import RouteProviderWrapper from './routers/RouteProviderWrapper'

createRoot(document.getElementById('root')).render(
 <>
    
    <AuthProvider> {/* ✅ AuthProvider wraps the whole app */}
      <CartContextProvider>
      <RouterProvider router={router} />
      <Loader/>
      <CustomToastContainer/>
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
        </CartContextProvider>
    </AuthProvider>
  </>
);

