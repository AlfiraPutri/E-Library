import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-100 mt-14 rounded-t-3xl">
      <section className="container">
        <div className=" py-5 text-center md:text-center">
          {/* company Details */}
          <div className="py-8 px-4 mx-auto">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-center mb-3 flex justify-center items-center gap-3 font-serif">
              E - Library
            </h1>
            <p className="text-sm">
            Akses Ilmu, Di Mana Saja, Kapan Saja.{" "}
            </p>
            <br />
            <div className="flex justify-center items-center gap-3">
              <FaLocationArrow />
              <p>Jl. Gayung Kebonsari Nomor 48, Gayungan, Surabaya - Jawa Timur 60235</p>
            </div>
            <div className="flex justify-center items-center gap-3 mt-3">
              <FaMobileAlt />
              <p>(031) 8291040</p>
            </div>
            {/* Social Handle */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <a href="https://www.instagram.com/pupr_bpsdm_bapekom6/">
                <FaInstagram className="text-3xl hover:text-primary duration-300" />
              </a>
              <a href="https://www.facebook.com/pupr.bpsdm.bapekom6?_rdc=1&_rdr">
                <FaFacebook className="text-3xl hover:text-primary duration-300" />
              </a>
              <a href="https://www.youtube.com/channel/UCeOB5nYLfjM8VmiN6mFc58g">
                <FaYoutube className="text-3xl hover:text-primary duration-300" />
              </a>
            </div>
          </div>
          {/* Links */}
        </div>
        <div className="py-4 border-t border-gray-300 text-center">
          <p>Copyright &copy; 2024</p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
