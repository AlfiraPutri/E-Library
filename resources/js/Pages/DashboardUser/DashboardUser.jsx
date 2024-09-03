import React from 'react';

import SidebarUser from '../../Components/sidebar/SidebarUser';
import Header from '../../Components/user/Header';
import SearchBar from '../../Components/user/SearchBar';
import BookCollection from '../../Components/user/BookCollection';
import Categories from '../../Components/user/Categories';
import UserProfile from '../../Components/user/UserProfile';
import { DashboardScreenWrap } from "../Dashboard/Dashboard.styles";
import SalesUser from '../../Components/dashboard/SalesBlock/HomeUser';


const DashboardUser= ({ auth }) => {



    return (
        <DashboardScreenWrap className="content-area">
   <div className="area-row ar-one">
     {/* <SearchBar /> */}
        <SalesUser />

            {/* <Header /> */}

              {/* <SearchBar /> */}
              {/* <BookCollection /> */}
              {/* <Categories /> */}


          {/* <UserProfile /> */}
          </div>
        </DashboardScreenWrap>
      );
};

export default DashboardUser;
