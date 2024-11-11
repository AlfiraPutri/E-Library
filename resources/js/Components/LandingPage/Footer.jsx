import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#003A67]">
      {/* Yellow bar at the top */}
      <div className="bg-yellow-500 h-4 w-full"></div>

      <section className="container">
        <div className="py-5 text-center md:text-center">
          {/* company Details */}
          <div className="py-8 px-4 mx-auto text-white">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-center mb-3 flex justify-center items-center gap-3 font-serif">
              Perpustakaan Digital
            </h1>
            <p className="text-sm">
              Akses Ilmu, Di Mana Saja, Kapan Saja.
            </p>
            <br />
            <div className="flex justify-center items-center gap-3">
              <FaMapMarkerAlt />
              <p>Jl. Gayung Kebonsari Nomor 48, Gayungan, Surabaya - Jawa Timur 60235</p>
            </div>
            <div className="flex justify-center items-center gap-3 mt-3">
              <FaPhoneAlt />
              <p>(031) 8291040</p>
            </div>
            {/* Social Handle */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <a href="https://www.instagram.com/pupr_bpsdm_bapekom6/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-3xl text-white hover:text-yellow-500 duration-300" />
              </a>
              <a href="https://www.facebook.com/pupr.bpsdm.bapekom6?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-3xl text-white hover:text-yellow-500 duration-300" />
              </a>
              <a href="https://www.youtube.com/channel/UCeOB5nYLfjM8VmiN6mFc58g" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-3xl text-white hover:text-yellow-500 duration-300" />
              </a>
            </div>
          </div>
        </div>
        <div className="py-4 border-t border-gray-300 text-center text-white">
          <p>Copyright &copy; Perpustakaan Balai Pengembangan Kompetensi Wilayah VI Surabaya. All Rights Reserved</p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
