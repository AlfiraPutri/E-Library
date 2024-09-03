import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">e-Library</div>
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Get your book here!" />
          <button>🔍</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
