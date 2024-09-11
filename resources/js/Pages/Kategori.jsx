import React from "react";
import Kategori from "../Components/KategoriBuku/Kategori";

const ListKategori = ({ setPageTitle }) => {
    return (
          <div className="area-row ar-two">
            <Kategori setPageTitle={setPageTitle} />
          </div>
      );
};

export default ListKategori;
