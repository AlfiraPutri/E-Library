import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard.jsx";
import User from "../Pages/User.jsx";
import Koleksi from "../Pages/Koleksi.jsx";
import Kategori from "../Pages/Kategori.jsx";
import Profile from "../Pages/Profile.jsx";
import BukuDetailsPage from "../Pages/EditBuku.jsx";
import UserDetailsPage from "../Pages/EditUser.jsx";
import DashboardUser from "../Pages/DashboardUser/DashboardUser.jsx";
import LibraryUser from "../Components/dashboard/SalesBlock/LibraryUser.jsx";
import DownloadUser from "../Components/dashboard/SalesBlock/DownloadUser.jsx";
import FavoriteUser from "../Components/dashboard/SalesBlock/FavoriteUser.jsx";
import ShowBukuPage from "../Pages/ShowBuku.jsx";
import FlipBukuPage from "../Pages/FlipBuku.jsx";
import * as React from "react";
import { useState } from "react";
import AdminLayoutWrapper from "./AdminLayoutWrapper.jsx";
import UserLayoutWrapper from "./UserLayoutWrapper.jsx";

const BaseLayout = ({ auth }) => {
    console.log("🚀 ~ BaseLayout ~ auth:", auth);

    const location = useLocation();
    const [pageTitle, setPageTitle] = useState("");

    const navigate = useNavigate();

    // const isEditBukuRoute = location.pathname.startsWith(
    //     "/dashboard/buku/edit"
    // );

    // //   const isEditBukuRoute = location.pathname.startsWith('/dashboard/buku/edit');
    // const [isShowBukuRoute, setIsShowBukuRoute] = useState(
    //     /^\/user\/buku\/\d+\/show$/.test(location.pathname)
    // );
    // //   const isShowBukuRoute = /^\/user\/buku\/\d+\/show$/.test(location.pathname);
    // const [isEditUserRoute, setIsEditUserRoute] = useState(
    //     location.pathname.startsWith("/dashboard/user/edit")
    // );
    // //   const isEditUserRoute = location.pathname.startsWith('/dashboard/user/edit');

    // const [isUserRoute, setIsUserRoute] = useState(
    //     location.pathname.startsWith("/user")
    // );
    // //  const isUserRoute = location.pathname.startsWith('/user');
    // const [isProfileRoute, setIsProfileRoute] = useState(
    //     location.pathname.startsWith("/dashboard/profile") ||
    //         location.pathname.startsWith("/user/profile")
    // );
    // //  const isProfileRoute = location.pathname.startsWith('/dashboard/profile') || location.pathname.startsWith('/user/profile');
    // const [isUserRouteSession, setIsUserRouteSession] = useState(false);




    // useEffect(() => {
    //     let title = "Detail Buku";
    //     if (location.pathname.startsWith("/dashboard/user")) {
    //         title = "Daftar Pengguna";
    //     } else if (location.pathname.startsWith("/dashboard/buku")) {
    //         title = "Daftar Buku";
    //     } else if (location.pathname.startsWith("/dashboard/kategori")) {
    //         title = "Daftar Kategori Buku";
    //     } else if (location.pathname.startsWith("/dashboard")) {
    //         title = "Dashboard";
    //     } else if (location.pathname.startsWith("/user/dashboard")) {
    //         title = "Daftar Buku";
    //     } else if (location.pathname.startsWith("/user/history")) {
    //         title = "History Buku";
    //     } else if (location.pathname.startsWith("/user/download")) {
    //         title = "Download Buku";
    //     } else if (location.pathname.startsWith("/user/favorite")) {
    //         title = "Favorite Buku";
    //     } else if (
    //         location.pathname.startsWith("/dashboard/buku/edit/{id_buku}")
    //     ) {
    //         title = "Edit Buku";
    //     }

    //     // Set the document's title
    //     document.title = title;
    //     setPageTitle(title);
    // }, [location]);

    return (
        <Routes>
            {/* <Route untuk admin */}
            <Route element={<AdminLayoutWrapper auth={auth} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/dashboard/user"
                    element={<User setPageTitle={setPageTitle} />}
                />
                <Route
                    path="/dashboard/buku"
                    element={<Koleksi setPageTitle={setPageTitle} />}
                />
                <Route
                    path="/dashboard/kategori"
                    element={<Kategori setPageTitle={setPageTitle} />}
                />

                <Route
                    path="/dashboard/profile"
                    element={<Profile auth={auth} />}
                />
                <Route
                    path="/dashboard/buku/edit/:id"
                    element={<BukuDetailsPage setPageTitle={setPageTitle} />}
                />
                <Route
                    path="/dashboard/user/edit/:id"
                    element={<UserDetailsPage />}
                />
            </Route>

            {/* Routes for user */}
            <Route element={<UserLayoutWrapper auth={auth} />}>
                <Route path="/user/dashboard" element={<DashboardUser />} />
                <Route
                    path="/user/history"
                    element={<LibraryUser auth={auth} />}
                />
                <Route
                    path="/user/download"
                    element={<DownloadUser auth={auth} />}
                />
                <Route
                    path="/user/favorite"
                    element={<FavoriteUser auth={auth} />}
                />
                <Route
                    path="/user/buku/:id/show"
                    element={<ShowBukuPage auth={auth} />}
                />
                <Route path="/user/flipbook/:id" element={<FlipBukuPage />} />
                <Route path="/user/profile" element={<Profile auth={auth} />} />
            </Route>
        </Routes>
    );
};

export default BaseLayout;
