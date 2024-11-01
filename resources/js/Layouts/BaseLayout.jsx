import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Components/sidebar/Sidebar";
import AppBar from "../Components/appBar/AppBar";
import AppBarUser from "../Components/appBar/AppBarUser";
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
  const navigate = useNavigate();

  const [isEditBukuRoute, setIsEditBukuRoute]=useState(location.pathname.startsWith('/dashboard/buku/edit'));
//   const isEditBukuRoute = location.pathname.startsWith('/dashboard/buku/edit');
const [isShowBukuRoute, setIsShowBukuRoute]=useState(/^\/user\/buku\/\d+\/show$/.test(location.pathname))
//   const isShowBukuRoute = /^\/user\/buku\/\d+\/show$/.test(location.pathname);
const [isEditUserRoute, setIsEditUserRoute]= useState(location.pathname.startsWith('/dashboard/user/edit'))
//   const isEditUserRoute = location.pathname.startsWith('/dashboard/user/edit');

const [isUserRoute, setIsUserRoute] = useState(location.pathname.startsWith('/user'))
//  const isUserRoute = location.pathname.startsWith('/user');
const [isProfileRoute, setIsProfileRoute] = useState(location.pathname.startsWith('/dashboard/profile') || location.pathname.startsWith('/user/profile'))
//  const isProfileRoute = location.pathname.startsWith('/dashboard/profile') || location.pathname.startsWith('/user/profile');
const [isUserRouteSession, setIsUserRouteSession]= useState(false)


 const searchParams = new URLSearchParams(location.search);
 const searchQuery = searchParams.get('search');

 useEffect(() => {
    if (auth) {
      setUserProfile(auth);
      const isUserRole = auth.user.role !== 'admin';
      setIsUserRouteSession(isUserRole);

      if (isUserRole && !isUserRoute) {
        navigate('/user/dashboard');
      } else if (!isUserRole && isUserRoute) {
        navigate('/dashboard');
      }
    }
  }, [auth, isUserRoute, navigate]);


 useEffect(() => {
    let title = "Detail Buku";

    if (location.pathname.startsWith('/dashboard/user')) {
      title = "Daftar Pengguna";
    } else if (location.pathname.startsWith('/dashboard/buku')) {
      title = "Daftar Buku";
    } else if (location.pathname.startsWith('/dashboard/kategori')) {
      title = "Category Management";
    } else if (location.pathname.startsWith('/dashboard')) {
      title = "Dashboard";
    } else if (location.pathname.startsWith('/user/dashboard')) {
      title = "Daftar Buku";
    } else if (location.pathname.startsWith('/user/history')) {
        title = "History Buku";
    } else if (location.pathname.startsWith('/user/download')) {
        title = "Download Buku";
    } else if (location.pathname.startsWith('/user/favorite')) {
        title = "Favorite Buku";
    } else if (location.pathname.startsWith('/dashboard/buku/edit/{id_buku}')) {
        title = "Edit Buku";
      }


 // Set the document's title
 document.title = title;
 setPageTitle(title);
}, [location, searchQuery]);


  return (
    <div className="page-wrapper">
      {!isEditUserRoute && (isUserRouteSession ? <SidebarUser /> : <Sidebar />)}
      <div className="content-wrapper">


        {!isProfileRoute && !isShowBukuRoute && !isEditBukuRoute && (
            isUserRouteSession ?
            <AppBarUser userProfile={userProfile} pageTitle={pageTitle} setPageTitle={setPageTitle} />
            :
            <AppBar userProfile={userProfile} pageTitle={pageTitle} setPageTitle={setPageTitle} />
        )}

        <Outlet />
        <Routes>

        {/* <Route untuk admin */}

        {!isUserRouteSession && (
            <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/user" element={<User setPageTitle={setPageTitle} />} />
          <Route path="/dashboard/buku" element={<Koleksi setPageTitle={setPageTitle} />} />
          <Route path="/dashboard/kategori" element={<Kategori setPageTitle={setPageTitle} />} />

          <Route path="/dashboard/profile" element={<Profile auth={auth}/>} />
          <Route path="/dashboard/buku/edit/:id" element={<BukuDetailsPage setPageTitle={setPageTitle}/>} />
          <Route path="/dashboard/user/edit/:id" element={<UserDetailsPage />} />
            </>
        )}

          {/* Routes for user */}

          {isUserRouteSession && (
            <>
          <Route path="/user/dashboard" element={<DashboardUser />} />
          <Route path="/user/history" element={<LibraryUser auth={auth}/>} />
          <Route path="/user/download" element={<DownloadUser auth={auth}/>} />
          <Route path="/user/favorite" element={<FavoriteUser auth={auth}/>} />
          <Route path="/user/buku/:id/show" element={<ShowBukuPage auth={auth}/>} />
          <Route path="/user/flipbook/:id" element={<FlipBukuPage />} />
          <Route path="/user/profile" element={<Profile auth={auth} />} />

            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default BaseLayout;
