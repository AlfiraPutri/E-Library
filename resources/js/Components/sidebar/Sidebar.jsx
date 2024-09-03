import { NavLink } from "react-router-dom";
import { SidebarWrap } from "./Sidebar.styles";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarClose } from "../../redux/slices/sidebarSlice";
import { useForm } from '@inertiajs/react';

const Icons = {
  LogoWhite: '/icons/logo_white.svg',
  Chart: '/icons/chart.svg',
  Graph: '/icons/graph.svg',
  Cart: '/icons/cart.svg',
  Bag: '/icons/bag.svg',
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

  const handleLogout = (e) => {
    e.preventDefault();
    post(route('logout'));
  };


  return (
    <SidebarWrap className={`${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <span className="brand-logo">
            <img src={Icons.LogoWhite} alt="site brand logo" />
          </span>
          <span className="brand-text">E-Library</span>
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
                <span className="menu-link-text">Home</span>
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
            <br></br>
            <li className="menu-item">
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
              >
                <span className="menu-link-icon">
                  <img src={Icons.Cog} alt="" />
                </span>
                <span className="menu-link-text">Profile</span>
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
                <span className="menu-link-text">Log Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </SidebarWrap>
  );
};

export default Sidebar;