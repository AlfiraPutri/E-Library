import { Customer, Revenue, Sales, TargetReality, Visitors, TopProducts, SalesMap, VolumeService } from "../../Components";
import { DashboardScreenWrap } from "./Dashboard.styles";
import React, { useState, useEffect } from 'react';

const Dashboard = ({ auth, setPageTitle }) => {

    useEffect(() => {
        setPageTitle('Dashboard');
      }, [setPageTitle]);

  return (
    <DashboardScreenWrap className="content-area">
      <div className="area-row ar-one">
        <Sales setPageTitle={setPageTitle}/>
        <Visitors setPageTitle={setPageTitle}/>
      </div>
      <div className="area-row ar-two">
        <Revenue setPageTitle={setPageTitle}/>
        {/* <Customer /> */}
        {/* <TargetReality /> */}
        <TopProducts setPageTitle={setPageTitle}/>
        {/* <SalesMap /> */}
        {/* <VolumeService /> */}
      </div>
    </DashboardScreenWrap>
  );
};

export default Dashboard;
