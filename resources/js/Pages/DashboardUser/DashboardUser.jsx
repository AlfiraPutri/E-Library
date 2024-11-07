import React, {useEffect} from 'react';

import { DashboardScreenWrap } from "../Dashboard/Dashboard.styles";
import SalesUser from '../../Components/dashboard/SalesBlock/HomeUser';


const DashboardUser= ({ auth, setPageTitle }) => {

    useEffect(() => {
        setPageTitle('Koleksi Buku');
      }, [setPageTitle]);


    return (
        <DashboardScreenWrap className="content-area">
   <div className="area-row ar-one">
     {/* <SearchBar /> */}
        <SalesUser setPageTitle={setPageTitle} />




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
