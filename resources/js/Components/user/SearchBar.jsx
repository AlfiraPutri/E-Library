import { React, useState, useRef, useEffect } from 'react';
import AppBarProfile from '../appBar/AppBarProfile';
import { AppBarWrap } from '../appBar/AppBar.styles';

const Icons = {
    SearchBlue: '/icons/search_blue.svg',
    // NotificationOrange: '/icons/notification_orange.svg',
}

const SearchBar = () => {

    const [showInputControl, setShowInputControl] = useState(false);
    const inputControlRef = useRef(null);

    const handleInputControlVisibility = () =>
      setShowInputControl(!showInputControl);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          inputControlRef.current &&
          !inputControlRef.current.contains(event.target) &&
          event.target.className !== "input-icon" &&
          event.target.className !== "input-icon-img"
        ) {
          setShowInputControl(false);
        }
      };

      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }, []);


  return (
    <AppBarWrap>
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
                  placeholder="Pencarian ..."
                  className={`input-control ${
                    showInputControl ? "show-input-control" : ""
                  }`}
                />
              </div>
            </form>
          </div>
          {/* <AppBarLang /> */}

          <AppBarProfile />
        </div>
        </AppBarWrap>
  );
};

export default SearchBar;
