import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeRouter from "../sectionChild/HomeRouter";
import AboutRoute from "../sectionChild/AboutRoute";
import ContactRoute from "../sectionChild/ContactRoute";
import LoginPage from "../auth/LoginPage";
import SignUpPage from "../auth/SignUpPage";
import ForgotPassword from "../pages/other/ForgotPassword";
import Plans from "../sectionChild/plans";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import UserDashboard from "../pages/dashboard/UserDashboard";
import BuyNft from "../activetion/BuyNft";
import ActivateAccount from "../activetion/ActivateAccount";
import ActiveReport from "../activetion/ActiveReport";


import WithdrawPage from "../Deposite/WithdrawPage";
import WithdrawHistoryPage from "../Deposite/WithdrawHistoryPage";
import DirectTeamPage from "../Team/DirectTeamPage";
import DownlineTeamPage from "../Team/DownlineTeamPage";
import LevelMemberDetails from "../Team/LevelMemberDetails";




import UpdateProfile from "../pages/other/UpdateProfile";
import ChangePassword from "../pages/other/ChangePassword";
import ChangeTNXpassword from "../pages/other/ChangeTNXpassword";
import AuthLayout from "../layouts/AuthLayout";
import AuthOnlyLayout from "../layouts/AuthOnlyLayout";
import PublicLayout from "../layouts/PublicLayout";
import PrivateRoute from "./PrivateRoute";

import Investment from "../sectionChild/investment";
import Kycpage from "../pages/dashboard/users/kyc";



import ProductForm from "../pages/product/ProductForm";
import MyProfile from "../pages/profile";
import Agreement from "../pages/profile/Agreement";
import ViewKyc from "../pages/profile/ViewKyc";
import UploadKyc from "../pages/profile/UploadKyc";
import Statement from "../pages/Statement";
import NewOrder from "../pages/dashboard/orders/NewOrder";
import PendingOrder from "../pages/dashboard/orders/PendingOrder";
import ApprovedOrders from "../pages/dashboard/orders/ApprovedOrders";
import ProductList from "../pages/dashboard/orders/ProductList";
import DirectTeam from "../pages/SalesTeam/DirectTeam";
import Depthdownline from "../pages/SalesTeam/Depthdownline";

import PurchaseBills from "../pages/dashboard/PurchaseBills";
import RejectedOrders from "../pages/dashboard/orders/RejectedOrders";
import Steppendency from "../pages/dashboard/account/Steppendency";
import SalesTeam from "../pages/SalesTeam/SalesTeam";



export const router = createBrowserRouter([

  
  // Auth pages - with auth checks
  {
    path: "/",
    element: <AuthOnlyLayout />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  
  // Direct auth routes
  { path: "/", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },

  // Private routes (authenticated only)
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <UserDashboard /> },
          { path: "home", element: <UserDashboard /> },
          //product
          { path: "product", element: <ProductForm /> },
      
          
          //product
          { path: "statement", element: <Statement /> },
          { path: "purchase-history", element: <PurchaseBills /> },
          { path: "step-pendency", element: <Steppendency /> },
          
          // profile
          { path: "profile", element: <MyProfile /> },
          // { path: "agreement", element: <Agreement /> },
          { path: "view-kyc", element: <ViewKyc /> },
          // { path: "upload-kyc", element: <UploadKyc /> },

          // orders
           { path: "new-order", element: <NewOrder /> },
           { path: "pending-order", element: <PendingOrder /> },
           { path: "my-approved-orders", element: <ApprovedOrders /> },
           { path: "rejected-orders", element: <RejectedOrders /> },
         

           //products
           { path: "products", element: <ProductList /> },


            
           // sales
           { path: "product-list", element: <ProductList /> },

 // sales
           { path: "direct-team", element: <DirectTeam /> },
           { path: "depth-downline", element: <Depthdownline /> },
           { path: "sales-team", element: <SalesTeam /> },

          // plan and investment
          { path: "plan", element: <Plans /> },
          { path: "investment", element: <Investment /> },
        

          // Account
          { path: "user/kyc", element: <Kycpage /> },
          { path: "user/agreement", element: <Agreement /> },
          

          // profile kyc
          { path: "user/kyc", element: <Kycpage /> },

          // Buy / Activation
          { path: "buy-nft", element: <BuyNft /> },
          { path: "buy-nft/activation/nft/:price", element: <ActivateAccount /> },
          { path: "cart-report", element: <ActiveReport /> },

      
   
          { path: "funds/withdraw", element: <WithdrawPage /> },
          { path: "funds/withdraw-history", element: <WithdrawHistoryPage /> },

          // Teams
          { path: "teams/direct-team", element: <DirectTeamPage /> },
          { path: "teams/downline-team", element: <DownlineTeamPage /> },
          { path: "level-view/:level", element: <LevelMemberDetails /> },
   

  

          // Profile / Password
          { path: "profile/update-profile", element: <UpdateProfile /> },
          { path: "password/change-password", element: <ChangePassword /> },
          { path: "password/change-txn-password", element: <ChangeTNXpassword /> },







        ],
      },
    ],
  },
]);
