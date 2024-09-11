import React from "react";
import Koleksi from "../Components/KoleksiBuku/Koleksi";

const ListKoleksi = ({ setPageTitle }) => {
    return (
          <div className="area-row ar-two">
            <Koleksi setPageTitle={setPageTitle} />
          </div>
      );
};

export default ListKoleksi;
