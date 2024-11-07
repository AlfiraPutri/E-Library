import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppBarWrap } from "./AppBar.styles";
// import AppBarLang from "./AppBarLang";
import AppBarProfile from "./AppBarProfile";
import { MdOutlineMenu } from "react-icons/md";
import { setSidebarOpen } from "../../redux/slices/sidebarSlice";
import { useLocation } from "react-router-dom";

const Icons = {
    SearchBlue: '/icons/search_blue.svg',
    // NotificationOrange: '/icons/notification_orange.svg',
}

const AppBar = ({ auth, pageTitle, setPageTitle, userProfile}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const [isSearching, setIsSearching] = useState(false);
    const inputControlRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [showInputControl, setShowInputControl] = useState(false);
    const handleInputControlVisibility = () =>
      setShowInputControl(!showInputControl);


    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedQuery(searchQuery); // Set the debounced query after delay
      }, 500); // 500ms delay for debouncing

      return () => {
        clearTimeout(handler); // Clear the timeout if user keeps typing
      };
    }, [searchQuery]); // This effect runs whenever `searchQuery` changes

    // Effect to trigger search when debounced query changes, but only in /dashboard/user route
    useEffect(() => {
      if (!isSearching) return;

      const isUserPage = location.pathname.startsWith('/dashboard/user');
      const isKategoriPage = location.pathname.startsWith('/dashboard/kategori');
      const isBukuPage = location.pathname.startsWith('/dashboard/buku');

      if (isUserPage) {
        navigate(debouncedQuery.trim() ? `/dashboard/user?search=${debouncedQuery}` : `/dashboard/user`);
        setPageTitle('Dashboard');
      } else if (isBukuPage) {
        navigate(debouncedQuery.trim() ? `/dashboard/buku?search=${debouncedQuery}` : `/dashboard/buku`);
        setPageTitle('Daftar Buku');
      } else if (isKategoriPage) {
        navigate(debouncedQuery.trim() ? `/dashboard/kategori?search=${debouncedQuery}` : `/dashboard/kategori`);
        setPageTitle('Kategori Buku');
      }
    }, [debouncedQuery, navigate, location.pathname, isSearching]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          inputControlRef.current &&
          !inputControlRef.current.contains(event.target) &&
          event.target.className !== "input-icon" &&
          event.target.className !== "input-icon-img"
        ) {
          setShowInputControl(false);
          setIsSearching(false);
        }
      };

      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        setIsSearching(true); // Set flag pencarian ke true saat input berubah
      };

    return (
      <AppBarWrap>
        <div className="appbar-content">
          <div className="appbar-left">
            <button
              type="button"
              className="sidebar-open-btn"
              onClick={() => dispatch(setSidebarOpen())}
            >
              <MdOutlineMenu size={24} />
            </button>
            <h3 className="appbar-title">{pageTitle}</h3>
          </div>
          <div className="appbar-right">
            <div className="appbar-search">
              <form action="">
                <div className="input-group">
                  <span
                    className="input-icon"
                    onClick={handleInputControlVisibility}
                  >
                    <img
                      src={Icons.SearchBlue}
                      className="input-icon-img"
                      alt=""
                    />
                  </span>
                  <input
                    ref={inputControlRef}
                    type="text"
                    value={searchQuery} // Bind the input value to searchQuery state
                    onChange={handleSearchInputChange}
                    placeholder="Search . . ."
                    className={`input-control ${
                      showInputControl ? "show-input-control" : ""
                    }`}
                  />
                </div>
              </form>
            </div>
            <AppBarProfile  userProfile={userProfile}/>
          </div>
        </div>
      </AppBarWrap>
    );
  };

  export default AppBar;
