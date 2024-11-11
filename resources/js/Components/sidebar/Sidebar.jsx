import { NavLink } from "react-router-dom";
import { SidebarWrap } from "./Sidebar.styles";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarClose } from "../../redux/slices/sidebarSlice";
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';


const Icons = {
  LogoWhite: '/icons/logo_white.svg',
  Chart: '/icons/home.svg',
  Graph: '/icons/users.svg',
  Cart: '/icons/books.svg',
  Bag: '/icons/kategori.svg',
  Cog: '/icons/cog.svg',
  SignOut: '/icons/sign_out.svg',
}

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const dispatch = useDispatch();
  const { post } = useForm();

  const handleSidebarClose = () => {
    dispatch(setSidebarClose());
  };

//   const handleLogout = (e) => {
//     e.preventDefault();
//     post(route('logout'));
//   };

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda akan keluar dari akun ini.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F9A01B',
      cancelButtonColor: '#20326A',
      confirmButtonText: 'Ya, keluar!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        post(route('logout'));
      }
    });
  };



  return (
    <SidebarWrap className={`${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <span className="brand-logo">
            <img src="/images/logo.png" alt="site brand logo" />
          </span>
          <span className="brand-text">Perpustakaan <br />Digital</span>
        </div>
        <button
          className="sidebar-close-btn"
          onClick={handleSidebarClose}
        >
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
                end
              >
                <span className="menu-link-icon">
                  <img src={Icons.Chart} alt="" />
                </span>
                <span className="menu-link-text">Beranda</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/dashboard/user"
                className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
              >
                <span className="menu-link-icon">
                  <img src={Icons.Graph} alt="" />
                </span>
                <span className="menu-link-text">Data User</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/dashboard/buku"
                className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
              >
                <span className="menu-link-icon">
                  <img src={Icons.Cart} alt="" />
                </span>
                <span className="menu-link-text">Koleksi</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/dashboard/kategori"
                className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
              >
                <span className="menu-link-icon">
                  <img src={Icons.Bag} alt="" />
                </span>
                <span className="menu-link-text">Kategori</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                to="/dashboard/review"
                className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
              >
                <span className="menu-link-icon">
                  <img src={Icons.Bag} alt="" />
                </span>
                <span className="menu-link-text">Review</span>
              </NavLink>
            </li> */}
            </ul>
            </div>
            <div className="sidebar-footer">
            <ul className="menu-list">
            <li className="menu-item">
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
              >
                <span className="menu-link-icon">
                  <img src={Icons.Cog} alt="" />
                </span>
                <span className="menu-link-text">Profil</span>
              </NavLink>
            </li>
            <li className="menu-item">
            <a
                href="#"
                onClick={handleLogout}
                className="menu-link"
              >
                <span className="menu-link-icon">
                  <img src={Icons.SignOut} alt="Sign Out" />
                </span>
                <span className="menu-link-text" style={{ color: '#FF4545' }}>Log Out</span>
              </a>
            </li>
            </ul>
</div>
      </div>
    </SidebarWrap>
  );
};

export default Sidebar;
