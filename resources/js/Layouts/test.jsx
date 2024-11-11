import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Components/sidebar/Sidebar";
import AppBar from "../Components/appBar/AppBar";
import AppBarUser from "../Components/appBar/AppBarUser";
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "../Pages/Dashboard/Dashboard";
import User from "../Pages/User";
import Koleksi from "../Pages/Koleksi";
import Kategori from "../Pages/Kategori";
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
import { useState, useEffect, useRef } from "react";

const BaseLayout = ({auth}) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  const navigate = useNavigate();


  const isEditBukuRoute = location.pathname.startsWith('/dashboard/buku/edit');
  const isEditUserRoute = location.pathname.startsWith('/dashboard/user/edit');
  const isProfileRoute = location.pathname.startsWith('/dashboard/profile') || location.pathname.startsWith('/user/profile');
//   const [isUserRouteSession, setIsUserRouteSession]= useState(false);
  const isUserRoute = location.pathname.startsWith('/user');

  const navigatedRef = useRef(false);

  useEffect(() => {
    if (auth?.user?.role && !navigatedRef.current) {
      const isUserRole = auth.user.role !== 'admin';

      // Navigasi hanya jika kondisi peran tidak sesuai dengan rute saat ini
      if (isUserRole && !isUserRoute) {
        navigate('/user/dashboard');
        navigatedRef.current = true;
      } else if (!isUserRole && isUserRoute) {
        navigate('/dashboard');
        navigatedRef.current = true;
      }
    }
  }, [auth?.user?.role, isUserRoute, location.pathname, navigate]);

  if (!auth) {
    return null; // Pastikan komponen tidak dirender sebelum autentikasi selesai
  }




  return (
    <div className="page-wrapper">
      {!isEditUserRoute && (auth.user.role !== 'admin' ? <SidebarUser /> : <Sidebar />)}

      <div className="content-wrapper">
        {!isProfileRoute && !isEditBukuRoute && (
            auth.user.role !== 'admin' ? (
            <AppBarUser userProfile={auth} pageTitle={pageTitle} setPageTitle={setPageTitle} />
        ) : (
            <AppBar userProfile={auth} pageTitle={pageTitle} setPageTitle={setPageTitle} />
        )
    )}

        {/* <Outlet /> */}
        <Routes>

        {/* <Route untuk admin */}



          <Route path="/dashboard" element={<Dashboard setPageTitle={setPageTitle} />} />
          <Route path="/dashboard/user" element={<User setPageTitle={setPageTitle} />} />
          <Route path="/dashboard/buku" element={<Koleksi setPageTitle={setPageTitle} />} />
          <Route path="/dashboard/kategori" element={<Kategori setPageTitle={setPageTitle} />} />
          <Route path="/dashboard/profile" element={<Profile auth={auth}/>} />
          <Route path="/dashboard/buku/edit/:id" element={<BukuDetailsPage setPageTitle={setPageTitle}/>} />
          <Route path="/dashboard/user/edit/:id" element={<UserDetailsPage />} />

          {/* Routes for user */}

          <Route path="/user/dashboard" element={<DashboardUser setPageTitle={setPageTitle}/>} />
          <Route path="/user/history" element={<LibraryUser auth={auth} setPageTitle={setPageTitle}/>} />
          <Route path="/user/download" element={<DownloadUser auth={auth} setPageTitle={setPageTitle}/>} />
          <Route path="/user/favorite" element={<FavoriteUser auth={auth} setPageTitle={setPageTitle}/>} />
          <Route path="/user/buku/:id/show" element={<ShowBukuPage auth={auth} setPageTitle={setPageTitle}/>} />
          <Route path="/user/flipbook/:id" element={<FlipBukuPage auth={auth}/>} />
          <Route path="/user/profile" element={<Profile auth={auth} />} />

        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;







//  const searchParams = new URLSearchParams(location.search);
//  const searchQuery = searchParams.get('search');

// const [userProfile, setUserProfile]= useState(null);
// const [isUserRoute, setIsUserRoute] = useState(location.pathname.startsWith('/user'));
// const [isProfileRoute, setIsProfileRoute] = useState(location.pathname.startsWith('/dashboard/profile') || location.pathname.startsWith('/user/profile'));
// const [isEditBukuRoute, setIsEditBukuRoute]=useState(location.pathname.startsWith('/dashboard/buku/edit'));
// const [isEditUserRoute, setIsEditUserRoute]= useState(location.pathname.startsWith('/dashboard/user/edit'));
// const [isShowBukuRoute, setIsShowBukuRoute]=useState(/^\/user\/buku\/\d+\/show$/.test(location.pathname));
// const isShowBukuRoute = /^\/user\/buku\/\d+\/show$/.test(location.pathname);


//  useEffect(() => {
//     let title = "Detail Buku";

//     if (location.pathname.startsWith('/dashboard/user')) {
//       title = "Daftar Pengguna";
//     } else if (location.pathname.startsWith('/dashboard/buku')) {
//       title = "Daftar Buku";
//     } else if (location.pathname.startsWith('/dashboard/kategori')) {
//       title = "Category Management";
//     } else if (location.pathname.startsWith('/dashboard')) {
//       title = "Dashboard";
//     } else if (location.pathname.startsWith('/user/dashboard')) {
//       title = "Daftar Buku";
//     } else if (location.pathname.startsWith('/user/history')) {
//         title = "History Buku";
//     } else if (location.pathname.startsWith('/user/download')) {
//         title = "Download Buku";
//     } else if (location.pathname.startsWith('/user/favorite')) {
//         title = "Favorite Buku";
//     } else if (location.pathname.startsWith('/dashboard/buku/edit/{id_buku}')) {
//         title = "Edit Buku";
//       }


//   Set the document's title
//  document.title = title;
//  setPageTitle(title);
// }, [location, searchQuery]);
