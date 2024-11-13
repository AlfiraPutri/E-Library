import AppBar from "@/Components/appBar/AppBarUser";
import SidebarUser from "@/Components/sidebar/SidebarUser";
import React from "react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const UserLayoutWrapper = ({ auth }) => {
    const location = useLocation();
    const navigate = useNavigate();
    // const searchParams = new URLSearchParams(location.search);
    // const searchQuery = searchParams.get("search");
    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        if (auth.user.role === "admin") {
            navigate("/dashboard");
        }
    }, [auth]);

    useEffect(() => {

        if (location.pathname.startsWith("/user/dashboard")) {
            setPageTitle("Koleksi Buku");
        } else if (location.pathname.startsWith("/user/history")) {
            setPageTitle("Riwayat Buku");
        } else if (location.pathname.startsWith("/user/download")) {
            setPageTitle("Download Buku");
        } else if (location.pathname.startsWith("/user/favorite")) {
            setPageTitle("Favorit Buku");
        } else if (/^\/user\/buku\/\d+\/show$/.test(location.pathname)) {
            setPageTitle("Detail Buku");
        }

    }, [location]);

    console.log(auth);

    const hideAppBar = location.pathname === "/user/profile";

    return (
        <div className="page-wrapper">
            <SidebarUser />
            <div className="content-wrapper">
            {!hideAppBar && (
                <AppBar
                    userProfile={auth}
                    pageTitle={pageTitle}
                    setPageTitle={setPageTitle}
                />
            )}
                <Outlet />
            </div>
        </div>
    );
};

export default UserLayoutWrapper;
