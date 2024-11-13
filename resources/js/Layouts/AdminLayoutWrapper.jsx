import { Sidebar } from "@/Components";
import AppBar from "@/Components/appBar/AppBar";
import React from "react";
import { useEffect, useState  } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayoutWrapper = ({ auth }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        if (auth.user.role !== "admin") {
            navigate("/user/dashboard");
        }
    }, [auth]);

    useEffect(() => {
        

        if (location.pathname.startsWith("/dashboard/user")) {
            setPageTitle("Daftar Pengguna");
        } else if (location.pathname.startsWith("/dashboard/buku")) {
            setPageTitle("Daftar Buku");
        } else if (location.pathname.startsWith("/dashboard/kategori")) {
            setPageTitle("Daftar Kategori Buku");
        } else if (location.pathname.startsWith("/dashboard")) {
            setPageTitle("Dashboard");
        }

    }, [location]);

    const hideProfile = location.pathname === "/dashboard/profile";
    const hideEditBuku = /^\/dashboard\/buku\/edit\/\d+$/.test(location.pathname);

    return (
        <div className="page-wrapper">
            <Sidebar />
            <div className="content-wrapper">
            {!hideProfile && !hideEditBuku && (
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

export default AdminLayoutWrapper;
