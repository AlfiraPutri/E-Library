import React from "react";
import { FcLibrary } from "react-icons/fc";
import { BiSolidSun } from "react-icons/bi";
import { BiSolidMoon } from "react-icons/bi";
import { Link } from 'react-router-dom';

const Navbar = ({}) => {
    return (
       <nav className="shadow-md bg-navbarBackground bg-cover bg-center duration-300">
        <div className="container flex justify-between items-center">
            {/*Logo section */}
            <h1 className="text-3xl font-semibold flex justify-center items-center gap-2">
                <img src="images/logo.png" className="w-20 h-20" />
                PustakaKu
            </h1>
            {/*Menu section */}
            <ul className="flex items-center gap-6 text-xl py-4 font-serif">
                <li>
                    <a href="#Hero" className="inline-block px-3 py-2 hover:text-yellow-400 transition-colors duration-200">Home</a>
                </li>
                <li>
                    <a href="#About" className="inline-block px-3 py-2 hover:text-yellow-400 transition-colors duration-200">About</a>
                </li>
                <li>
                    <a href="#Services" className="inline-block px-3 py-2 hover:text-yellow-400 transition-colors duration-200">Service</a>
                </li>
                <li>
                <a href="/login" className="border border-white px-6 py-2 rounded-full hover:shadow-custom-inset hover:bg-primary hover:border-transparent transition-all duration-200">
                Login
                    </a>
                </li>
            </ul>

{/* <div>
    {
        theme === "dark" ? (
            <BiSolidSun onClick={() => setTheme ("light")} className="text-2xl"/>
        ) : (
            <BiSolidMoon onClick={() => setTheme ("dark")} className="text-2xl"/>
        )
    }

</div> */}

            </div>
       </nav>
    );
};

export default Navbar;
