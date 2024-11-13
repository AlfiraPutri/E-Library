
import {
    Customer,
    Revenue,
    Sales,
    TargetReality,
    Visitors,
    TopProducts,
    SalesMap,
    VolumeService,
} from "../../Components";
import { DashboardScreenWrap } from "./Dashboard.styles";

const Dashboard = () => {
    return (
        <DashboardScreenWrap className="content-area">
            <div className="area-row ar-one">
                <Sales />
                <Visitors />
            </div>
            <div className="area-row ar-two">
                <Revenue />
                {/* <Customer /> */}
                {/* <TargetReality /> */}
                <TopProducts />
                {/* <SalesMap /> */}
                {/* <VolumeService /> */}
            </div>
        </DashboardScreenWrap>
    );
};

export default Dashboard;
