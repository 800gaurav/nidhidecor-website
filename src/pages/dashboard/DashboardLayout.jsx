// Layout component
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './users/Usernav';
import UserNavbar from './users/UserTopNav';
import CustomerSupport from '../../components/CustomerSupport';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 ">
      <UserSidebar />
     
     <div className="fixed top-0 w-full bg-white right-0 z-15">
          <UserNavbar />
        </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-0 mt-17">
      
 <Outlet />
      </main>
      <CustomerSupport />
    </div>
  );
};

export default DashboardLayout;