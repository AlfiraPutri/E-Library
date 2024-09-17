import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/sidebar/Sidebar";
import AppBar from "../Components/appBar/AppBar";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "../Pages/Dashboard/Dashboard";
import User from "../Pages/User";
import Koleksi from "../Pages/Koleksi";
import Kategori from "../Pages/Kategori";
import Review from "../Pages/Review";
import Profile from "../Pages/Profile";
import BukuDetailsPage from "../Pages/EditBuku";
import UserDetailsPage from "../Pages/EditUser";
import DashboardUser from "../Pages/DashboardUser/DashboardUser";
import SidebarUser from "../Components/sidebar/SidebarUser";
import LibraryUser from "../Components/dashboard/SalesBlock/LibraryUser";
import DownloadUser from "../Components/dashboard/SalesBlock/DownloadUser";
import FavoriteUser from "../Components/dashboard/SalesBlock/FavoriteUser";
import ShowBukuPage from "../Pages/ShowBuku";
import FlipBukuPage from "../Pages/FlipBuku";
import * as React from 'react';
import { useState, useEffect } from "react";

const BaseLayout = ({auth}) => {
  console.log("🚀 ~ BaseLayout ~ auth:", auth)

  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  const [userProfile, setUserProfile]= useState(null);

  // Determine if the current route is /dashboard/buku/edit
  const isEditBukuRoute = location.pathname.startsWith('/dashboard/buku/edit');
  const isEditUserRoute = location.pathname.startsWith('/dashboard/user/edit');

  // Determine if the current route is /user/dashboard
 const isUserRoute = location.pathname.startsWith('/user');
 const isProfileRoute = location.pathname.startsWith('/dashboard/profile') || location.pathname.startsWith('/user/profile');

 // Extract query params including 'search'
 const searchParams = new URLSearchParams(location.search);
 const searchQuery = searchParams.get('search'); // Get the search query if exists

 // Function to set the page title dynamically
 useEffect(() => {
    let title = "Dashboard"; // Default title

    if (location.pathname.startsWith('/dashboard/user')) {
      title = "Daftar Pengguna";
    } else if (location.pathname.startsWith('/dashboard/buku')) {
      title = "Daftar Buku";
    } else if (location.pathname.startsWith('/dashboard/kategori')) {
      title = "Category Management";
    } else if (location.pathname.startsWith('/dashboard')) {
      title = "Dashboard";
    } else if (location.pathname.startsWith('/user')) {
      title = "User Dashboard";
    } else if (location.pathname.startsWith('/dashboard/buku/edit/{id_buku}')) {
        title = "Edit Buku";
      }
      if(auth){
        setUserProfile(auth)
      }

 // Set the document's title
 document.title = title;
 setPageTitle(title);
}, [location, searchQuery]);


  return (
    <div className="page-wrapper">
      {!isEditUserRoute && (isUserRoute ? <SidebarUser /> : <Sidebar />)}
      <div className="content-wrapper">

        {/* Hide AppBar if on /user/dashboard route */}
        {!isProfileRoute && !isUserRoute && !isEditBukuRoute && (
            <AppBar userProfile={userProfile} pageTitle={pageTitle} setPageTitle={setPageTitle} />
        )}


        <Outlet />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/user" element={<User setPageTitle={setPageTitle} />} />
          <Route path="/dashboard/buku" element={<Koleksi setPageTitle={setPageTitle} />} />
          <Route path="/dashboard/kategori" element={<Kategori setPageTitle={setPageTitle} />} />
          <Route path="/dashboard/review" element={<Review />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/buku/edit/:id" element={<BukuDetailsPage setPageTitle={setPageTitle}/>} />
          <Route path="/dashboard/user/edit/:id" element={<UserDetailsPage />} />


          {/* Routes for user dashboard */}
          <Route path="/user/dashboard" element={<DashboardUser />} />
          <Route path="/user/history" element={<LibraryUser  auth={auth}/>} />
          <Route path="/user/download" element={<DownloadUser auth={auth}/>} />
          <Route path="/user/favorite" element={<FavoriteUser auth={auth}/>} />
          <Route path="/user/profile" element={<DashboardUser />} />
          <Route path="/user/buku/:id/show" element={<ShowBukuPage auth={auth}/>} />
          <Route path="/user/flipbook/:id" element={<FlipBukuPage />} />



        </Routes>
      </div>
    </div>
  );
};

export default BaseLayout;
