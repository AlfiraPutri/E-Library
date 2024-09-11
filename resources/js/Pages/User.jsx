import React from "react";
import DataUsers from "../Components/DataUser/DataUsers";

const User = ({ setPageTitle }) => {
    return (
          <div className="area-row ar-two">
            <DataUsers setPageTitle={setPageTitle} />
          </div>

      );
};

export default User;
