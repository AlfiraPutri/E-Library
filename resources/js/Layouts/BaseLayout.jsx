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


const BaseLayout = ({auth}) => {
  console.log("🚀 ~ BaseLayout ~ auth:", auth)
  const location = useLocation();

  // Determine if the current route is /dashboard/buku/edit
  const isEditBukuRoute = location.pathname.startsWith('/dashboard/buku/edit');
  const isEditUserRoute = location.pathname.startsWith('/dashboard/user/edit');

  // Determine if the current route is /user/dashboard
 const isUserRoute = location.pathname.startsWith('/user');

  return (
    <div className="page-wrapper">
      {!isEditBukuRoute && !isEditUserRoute && (isUserRoute ? <SidebarUser /> : <Sidebar />)}
      <div className="content-wrapper">

        {/* Hide AppBar if on /user/dashboard route */}
        {!isUserRoute && <AppBar />}


        <Outlet />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/user" element={<User />} />
          <Route path="/dashboard/buku" element={<Koleksi />} />
          <Route path="/dashboard/kategori" element={<Kategori />} />
          <Route path="/dashboard/review" element={<Review />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/buku/edit/:id" element={<BukuDetailsPage />} />
          <Route path="/dashboard/user/edit/:id" element={<UserDetailsPage />} />

          {/* Routes for user dashboard */}
          <Route path="/user/:id/dashboard" element={<DashboardUser />} />
          <Route path="/user/history" element={<LibraryUser  auth={auth}/>} />
          <Route path="/user/download" element={<DownloadUser />} />
          <Route path="/user/favorite" element={<FavoriteUser />} />
          <Route path="/user/profile" element={<DashboardUser />} />
          <Route path="/user/buku/:id/show" element={<ShowBukuPage />} />
          <Route path="/user/flipbook/:id" element={<FlipBukuPage />} />



        </Routes>
      </div>
    </div>
  );
};

export default BaseLayout;
